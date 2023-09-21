import {
  birthFactory,
  bovineFactory,
  inseminationFactory,
  porcineFactory,
  weightHistoryFactory,
} from "./factories";

export function seeder() {
  [...Array.from({ length: 10 })].forEach(async () => {
    // console.log("bovine: ", await bovineFactory());
    // console.log("birth: ", await birthFactory());
    // console.log("insemination: ", await inseminationFactory());
    // console.log("porcine: ", await porcineFactory());
    console.log("weightHistory: ", await weightHistoryFactory());
  });
}
