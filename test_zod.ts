import { z } from "zod";

try {
  // Test 1: Zod 4 enum error message
  const myEnum = z.enum(["A", "B"], {
    errorMap: () => ({ message: "Status is required" })
  });
  
  // Test 2: Zod 4 coerce date error message
  const myDate = z.coerce.date({
    errorMap: () => ({ message: "Date is required" })
  });
  
  console.log("ErrorMap is supported.");
} catch (e) {
  console.error("ErrorMap failed:", e.message);
}

try {
  const myEnum2 = z.enum(["A", "B"], { message: "Status is required" });
  console.log("message property is supported for enum.");
} catch(e) {}

try {
  const myDate2 = z.coerce.date({ message: "Date is required" });
  console.log("message property is supported for coerce date.");
} catch(e) {}
