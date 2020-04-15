import { AssertionError } from "assert";

export type PreparedTest = () => Promise<void>;

export enum TestOutcome {
  Pass = "Pass",
  Fail = "Fail",
  Error = "Error",
}

export interface TestResult {
  outcome: TestOutcome;
  error?: Error;
}

export async function runTest(test: PreparedTest): Promise<TestResult> {
  let outcome;
  let error;

  try {
    test.call(null);
    outcome = TestOutcome.Pass;
  } catch (e) {
    outcome =
      e instanceof AssertionError ? TestOutcome.Fail : TestOutcome.Error;
    error = e;
  }

  return {
    outcome,
    error,
  };
}
