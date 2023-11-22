export function AuthAside({ type }) {
  const url =
    type === "login"
      ? "https://firebasestorage.googleapis.com/v0/b/ganatech-e8724.appspot.com/o/images%2FLogin.jpeg?alt=media&token=c7316208-760a-4e07-a789-8966d010c7da&_gl=1*x1hxv0*_ga*MTU2MjQxMTEwNy4xNjk1MDkwMTY3*_ga_CW55HF8NVT*MTY5Nzg0NTQ5Ny40OS4xLjE2OTc4NDU1MDUuNTIuMC4w"
      : "https://firebasestorage.googleapis.com/v0/b/ganatech-e8724.appspot.com/o/images%2FRegister.jpeg?alt=media&token=eb56923e-9ebd-4dce-abaf-a43739661780";
  return (
    <div className="relative hidden h-full flex-col bg-black p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 flex bg-primary/70">
        <img src={url} className="flex-1 object-cover object-center" />
      </div>
    </div>
  );
}
