export const Navbar = () => {
  return (
    <header className="bg-card shadow-sm">
      <div className="flex justify-between items-center mx-auto p-4 sm:p-6 container">
        {/* Heading */}
        <div className="space-y-1">
          <h1 className="font-bold text-foreground text-2xl sm:text-3xl">
            Candidate Management
          </h1>
          <p className="text-muted-foreground">
            Manage and track all candidates in one place
          </p>
        </div>
      </div>
    </header>
  );
};
