"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return <div className="to-blue-600 text-xl font-medium">{error.message}</div>;
};
export default ErrorPage;
