import {
  birthFactory,
  bovineFactory,
  inseminationFactory,
  porcineFactory,
  weightHistoryFactory,
} from "./factories";

export function seeder(farm_id) {
  [...Array.from({ length: 10 })].forEach(async () => {
    console.log("bovine: ", await bovineFactory(farm_id));
    console.log("birth: ", await birthFactory(farm_id));
    console.log("insemination: ", await inseminationFactory(farm_id));
    console.log("porcine: ", await porcineFactory(farm_id));
    console.log("weightHistory: ", await weightHistoryFactory(farm_id));
  });
}
