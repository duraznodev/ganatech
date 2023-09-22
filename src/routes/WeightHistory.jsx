import { useState } from "react";
import { allFromCollection, getCollection } from "../firebase/api";
import { useEffect } from "react";
import { DataTable } from "../components/ui/data-table";
import { columns, data } from "../components/WeigthTable/columns";

export default function WeightHistory() {
  const [weightHistories, setWeightHistories] = useState([]);
  useEffect(() => {
    const init = async () => {
      setWeightHistories(
        await allFromCollection(getCollection("weight_history"))
      );
    };
    init();
  }, []);

  console.log(weightHistories);
  return (
    <div className="container mx-auto py-10">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm flex">
        <div class="flex-1">
          <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 class="font-semibold tracking-tight text-lg">Selena</h3>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              class="text-2xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M468.958 108.958c-27.507 2.08-48.997 7.94-71.375 22.572-5.333-2.214-12.62-17.738-16-16-11.82 6.08-14.892 19.555-4.916 32.817l-59.084 9.916c-24.776 3.341-49.567 4.838-74.187 5.334 1.326 3.832 2.96 7.636 4.812 10.05 5.219 6.802 20.323 6.21 21.07 14.75 1.935 22.098-24.876 47.415-47.056 47.057-15.401-.248-17.017-28.762-31.604-33.713-19.097-6.482-41.62 18.77-59.699 9.832-15.267-7.547-24.992-39.8-27.836-50.41-10.213-.127-20.327-.142-30.316.035-12.564.366-22.902 5.645-29.408 14.239-8.676 11.458-11.652 26.658-13.254 42.925-1.78 18.057 6.147 53.007 5.517 70.282-.504 13.85-7.493 11.87-11.912 18.888-13.52 21.47 8.894 20.83 17.014 5.56 12.482-23.473 4.253-63.11 7.195-92.974 1.855-35.76 10.597-23.937 15.664-24.588-4.2 13.065-6.21 30.962-7 51.334 6.895-2.342 36.498-11.6 42.73-.174 6.872 12.598-27.802 22.016-23.878 35.819 2.464 8.666 22.95 2.378 24.582 11.238 3.322 18.035-32.13 38.713-42.236 44.209.812 23.329 1.564 45.567 1.238 65.086H88.91c-4.234-16.543-12.038-49.944-4.06-55.084 21.425-18.091 29.836-37.484 42.732-56.428 8.755 2.556 16.92 4.787 24.782 6.672 3.553.972 7.244 1.771 10.984 2.44 24.859 4.967 61.553 5.678 90.783-.172 3.76 34.12 7.263 68.452 4.602 102.572h28.957c-12.375-26.902-4.263-65.044 13.892-86.27l44.934-33.462c24.881-16.384 42.93-37.996 55.982-63.38 30.402 3.413 57.086 3.29 77.192-.786l12.84-19.55c-24.257-17.857-43.3-36.585-62.948-58.13 10.063-14.533 25.027-22.765 39.375-32.506zm-39.375 54.572a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM366.2 183.481c5.029 9.822-26.17 10.808-24.933 21.772.998 8.847 22.204 3.839 23.53 12.643 3.818 25.373-28.44 53.805-54.08 54.78-14.262.544-34.902-14.06-32.308-28.093 2.605-14.092 34.551-1.657 40.383-14.748 4.724-10.603-18.352-22.01-12.992-32.307 6.264-12.032 30.364-22.553 41.934-22.646 11.57-.093 15.606 3.347 18.466 8.6zm-26.585 126.346l-34.707 23.96 6.464 69.255h34.414c-11.783-22.454-15.58-55.506-6.171-93.215zm-204.561 1.41c-6.047 12.184-14.147 21.97-22.174 31.242 5.97 3.235 11.648 5.414 17.154 6.614 11.218 2.443 21.636.333 29.948-4.408 10.056-5.737 17.521-14.452 24.115-23.368-14.615-.869-32.96-2.962-49.043-10.08zm24.252 52c-8.737 2.585-17.452 3.7-25.566 2.96 5.167 12.624 10.45 24.152 15.824 36.845h28.306c-10.393-18.48-16.148-29.285-18.564-39.805z"></path>
            </svg>
          </div>
          <div class="p-6 pt-0 flex flex-wrap gap-2">
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-x-1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 384 512"
                class="text-rose-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V349.1z"></path>
              </svg>
              Vaca
            </div>
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-x-1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="text-rose-400"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
              </svg>{" "}
              Embarazada
            </div>
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-x-1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="w-2 text-slate-950"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
              </svg>{" "}
              Muerto
            </div>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
