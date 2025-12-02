import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center bg-muted min-h-screen">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-4xl">404</h1>
        <p className="mb-4 text-muted-foreground text-xl">
          Oops! Page not found
        </p>
        <Link to="/" className="text-primary hover:text-primary/90 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
