import { ErrorResponse, useNavigate, useRouteError } from "react-router-dom"
import { Button } from "./ui/button"

export function ErrorPage() {
  const error = useRouteError() as ErrorResponse
  const navigate = useNavigate()

  if (error.status == 404)
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 font-geist-sans">
        <h1 className="text-5xl font-bold">Not Found</h1>
        <p>This page does not exist.</p>
        <Button
          onClick={() => {
            navigate("/")
          }}
        >
          Back to home
        </Button>
      </div>
    )

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  )
}
