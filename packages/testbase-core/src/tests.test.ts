import { runTest, TestOutcome } from "./tests";
import assert from "assert";

describe("runTest", () => {
  let test: jest.Mock;

  beforeEach(() => {
    test = jest.fn();
  });

  describe("when test does not throw error", () => {
    it("should defined result outcome as pass", async () => {
      const { outcome } = await runTest(test);
      expect(outcome).toEqual(TestOutcome.Pass);
    });

    it("should not define error", async () => {
      const { error } = await runTest(test);
      expect(error).toBeUndefined();
    });
  });

  describe("when test throws error", () => {
    const expectedError = new Error();

    beforeEach(() => {
      test.mockImplementation(() => {
        throw expectedError;
      });
    });

    it("should defined result outcome as error", async () => {
      const { outcome } = await runTest(test);
      expect(outcome).toEqual(TestOutcome.Error);
    });

    it("should not define error", async () => {
      const { error } = await runTest(test);
      expect(error).toEqual(expectedError);
    });
  });

  describe("when test throws error", () => {
    let expectedError: Error;

    beforeEach(() => {
      test.mockImplementation(() => {
        try {
          assert(false);
        } catch (e) {
          expectedError = e;
          throw e;
        }
      });
    });

    it("should defined result outcome as fail", async () => {
      const { outcome } = await runTest(test);
      expect(outcome).toEqual(TestOutcome.Fail);
    });

    it("should not define error", async () => {
      const { error } = await runTest(test);
      expect(error).toEqual(expectedError);
    });
  });
});
