export function AuthAside({ type }) {
  const url =
    type === "login"
      ? "https://firebasestorage.googleapis.com/v0/b/ganatech-e8724.appspot.com/o/images%2FLogin.jpeg?alt=media&token=c7316208-760a-4e07-a789-8966d010c7da&_gl=1*x1hxv0*_ga*MTU2MjQxMTEwNy4xNjk1MDkwMTY3*_ga_CW55HF8NVT*MTY5Nzg0NTQ5Ny40OS4xLjE2OTc4NDU1MDUuNTIuMC4w"
      : "/src/assets/register.jpg";
  return (
    <div className="relative hidden h-full flex-col bg-black p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-primary/70">
        <img src={url} alt="" />
      </div>
      {/* <div className="relative z-20 flex items-center text-lg gap-x-1 font-semibold tracking-wide">
      <img src="/src/assets/logo.png" className="w-8" />
      <span>Ganatech</span>
    </div> */}
    </div>
  );
}
