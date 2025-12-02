"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudUpload, File, Plus } from "lucide-react";
import { Controller, useForm, type UseFormReturn } from "react-hook-form";
import {
  addCandidateFormSchema,
  type IAddCandidateFormSchema,
} from "@/schemas/candidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { INITIAL_ADD_CANDIDATE_FORM_DATA } from "@/constants/candidate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCandidates } from "@/context/CandidateContext";
import { Label } from "@/components/ui/label";
import type { CandidateEducation } from "@/types/candidate";
import { toast } from "sonner";
import { ErrorCard } from "@/components/ErrorCard";

interface ResumeFile {
  resumeFile?: string;
  resumeFileName?: string;
  resumeFileType?: "pdf" | "docx";
}

export function AddCandidateModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [resumeFile, setResumeFile] = React.useState<ResumeFile>({
    resumeFile: undefined,
    resumeFileName: undefined,
    resumeFileType: undefined,
  });

  const { service } = useCandidates();

  const form = useForm<IAddCandidateFormSchema>({
    resolver: zodResolver(addCandidateFormSchema),
    defaultValues: INITIAL_ADD_CANDIDATE_FORM_DATA,
  });

  const onSubmit = async (formData: IAddCandidateFormSchema) => {
    const newCandidate = {
      ...formData,
      graduationYear: parseInt(formData.graduationYear),
      currentSalary: parseInt(formData.currentSalary),
      expectedSalary: parseInt(formData.expectedSalary),
      experienceYears: parseInt(formData.experienceYears),
      educationLevel: formData.educationLevel as CandidateEducation,
      resumeFile: resumeFile.resumeFile,
      resumeFileName: resumeFile.resumeFileName,
      resumeFileType: resumeFile.resumeFileType,
    };

    const isAdded = await service.addCandidate(newCandidate);

    if (!isAdded) return;

    toast.success("Candidate added successfully");
    setOpen(false);
    form.reset();
  };

  const onOpenChange = () => {
    setOpen((prevOpen) => !prevOpen);
    form.clearErrors();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus className="mr-2 size-4" />
            Add Candidate
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
          </DialogHeader>
          <AddCandidateForm
            form={form}
            resumeFile={resumeFile}
            onFormSubmit={onSubmit}
            onCloseModal={onOpenChange}
            onResumeChange={setResumeFile}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 size-4" />
          Add Candidate
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Add New Candidate</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto scrollbar-hide">
          <AddCandidateForm
            form={form}
            resumeFile={resumeFile}
            onFormSubmit={onSubmit}
            onCloseModal={onOpenChange}
            onResumeChange={setResumeFile}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function AddCandidateForm({
  form,
  resumeFile,
  onFormSubmit,
  onCloseModal,
  onResumeChange,
}: {
  form: UseFormReturn<IAddCandidateFormSchema>;
  resumeFile: ResumeFile;
  onFormSubmit: (data: IAddCandidateFormSchema) => void;
  onCloseModal: () => void;
  onResumeChange: React.Dispatch<React.SetStateAction<ResumeFile>>;
}) {
  const { state } = useCandidates();

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const handleChooseFile = () => {
    if (!inputFileRef.current) return;

    inputFileRef.current.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const file = files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      onResumeChange({
        resumeFile: fileReader.result as string,
        resumeFileName: file.name,
        resumeFileType: file.type.split("/").pop() as "pdf" | "docx",
      });
    };

    fileReader.readAsDataURL(file);
  };

  const isLoading = state.loading.type === "ADD" && state.loading.active;

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onFormSubmit)}>
      <FieldGroup className="gap-4!">
        <div className="gap-4 grid grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email *</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="gap-4 grid grid-cols-2">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Phone *</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="city">City *</FieldLabel>
                <Input
                  {...field}
                  id="city"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="gap-4 grid grid-cols-3">
          <Controller
            name="institute"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="institute">Institute *</FieldLabel>
                <Input
                  {...field}
                  id="institute"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="educationLevel"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="degree">Degree *</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="w-full"
                    id="degree"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Bachelor">Bachelor</SelectItem>
                      <SelectItem value="Master">Master</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="graduationYear"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="graduationYear">
                  Graduation Year *
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="graduationYear"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="gap-4 grid grid-cols-2">
          <Controller
            name="currentPosition"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="currentPosition">
                  Current Position *
                </FieldLabel>
                <Input
                  {...field}
                  id="currentPosition"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="currentCompany"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="currentCompany">
                  Current Company *
                </FieldLabel>
                <Input
                  {...field}
                  id="currentCompany"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="gap-4 grid grid-cols-2">
          <Controller
            name="experienceYears"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="experienceYears">
                  Experience (Years) *
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="experienceYears"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="noticePeriod"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="noticePeriod">Noticed Period *</FieldLabel>
                <Input
                  {...field}
                  id="noticePeriod"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="gap-4 grid grid-cols-2">
          <Controller
            name="currentSalary"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="currentSalary">
                  Current Salary (PKR) *
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="currentSalary"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="expectedSalary"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="expectedSalary">
                  Expected Salary (PKR) *
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="expectedSalary"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="appliedPosition"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="appliedPosition">
                Applied Position *
              </FieldLabel>
              <Input
                {...field}
                id="appliedPosition"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="reasonToSwitch"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reasonToSwitch">Reason To Switch</FieldLabel>
              <Textarea
                {...field}
                id="reasonToSwitch"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                rows={3}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="loomLink"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="loomLink">Loom Link</FieldLabel>
              <Input
                {...field}
                id="loomLink"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="space-y-2">
          <Label>Upload Resume</Label>
          <div className="flex flex-col justify-center items-center gap-1 bg-primary/5 p-3 border-2 border-primary/40 border-dashed rounded-sm">
            {resumeFile.resumeFile ? (
              <File className="size-10" />
            ) : (
              <CloudUpload className="size-10" />
            )}

            <p className="font-semibold text-sm">
              {resumeFile.resumeFileName
                ? resumeFile.resumeFileName
                : "No file selected"}
            </p>
            <Button
              type="button"
              variant="link"
              className="cursor-pointer"
              onClick={handleChooseFile}
            >
              {resumeFile.resumeFile ? "Change File" : "Choose File"}
            </Button>
          </div>

          <input
            type="file"
            hidden
            ref={inputFileRef}
            onChange={handleInputChange}
            accept=".pdf"
          />
        </div>
      </FieldGroup>

      <div className="flex justify-end items-center gap-2">
        <Button
          type="button"
          className="cursor-pointer"
          variant="outline"
          onClick={onCloseModal}
        >
          Cancel
        </Button>

        <Button type="submit" className="cursor-pointer" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Candidate"}
        </Button>
      </div>

      {state.error.type === "ADD" && state.error.message && (
        <ErrorCard message={state.error.message} />
      )}
    </form>
  );
}
