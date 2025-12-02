import React from "react";

type Config = {
  timestamps?: number | string;
  muted?: boolean;
  autoplay?: boolean;
  hideEmbedTopBar?: boolean;
  hideTitle?: boolean;
  hideOwner?: boolean;
  hideShare?: boolean;
};

type LoomPlayerProps = React.IframeHTMLAttributes<HTMLIFrameElement> & Config;

const generateLoomURL = (url: string, config?: Config) => {
  if (!url) return null;

  const options = [];

  //   IF URL is not a loom link
  if (
    !url.startsWith("https://www.loom.com/embed/") &&
    !url.startsWith("https://www.loom.com/share/")
  )
    return null;

  url = url.replace(
    "https://www.loom.com/share/",
    "https://www.loom.com/embed/"
  );

  if (config?.autoplay) {
    options.push("autoplay=true");
  }
  if (config?.timestamps) {
    if (typeof config.timestamps === "number") {
      options.push(`t=${encodeURIComponent(config.timestamps)}s`);
    } else {
      options.push(`t=${encodeURIComponent(config.timestamps)}`);
    }
  }
  if (config?.muted) {
    options.push("muted=true");
  }
  if (config?.hideEmbedTopBar) {
    options.push("hideEmbedTopBar=true");
  }
  if (config?.hideTitle) {
    options.push("hide_title=true");
  }
  if (config?.hideOwner) {
    options.push("hide_owner=true");
  }
  if (config?.hideShare) {
    options.push("hide_share=true");
  }

  return `${url.split("?")[0]}?${options.join("&")}`;
};

export const LoomPlayer = ({ ...iframeProps }: LoomPlayerProps) => {
  const src = generateLoomURL(iframeProps.src!, {
    autoplay: iframeProps.autoplay,
    timestamps: iframeProps.timestamps,
    muted: iframeProps.muted,
    hideEmbedTopBar: iframeProps.hideEmbedTopBar,
    hideTitle: iframeProps.hideTitle,
    hideOwner: iframeProps.hideOwner,
    hideShare: iframeProps.hideShare,
  });

  return (
    <div className="size-full">
      {src ? (
        <iframe
          {...iframeProps}
          src={src}
          sandbox="allow-scripts allow-same-origin"
          className={`size-full ${iframeProps.className}`}
          allowFullScreen
        ></iframe>
      ) : null}
    </div>
  );
};
