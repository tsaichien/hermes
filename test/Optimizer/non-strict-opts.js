/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermesc -target=HBC -dump-ir -O -fno-inline -non-strict %s | %FileCheckOrRegen --match-full-lines %s
//
// Test the effect of optimizations functions in non-strict mode, since their callsites cannot be analyzed.

function main()  {
  function foo(p1) {
    return "value" + p1;
  }
  foo(2)
}

// Auto-generated content below. Please do not modify manually.

// CHECK:function global(): undefined
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = DeclareGlobalVarInst "main": string
// CHECK-NEXT:  %1 = CreateFunctionInst (:object) %main(): undefined
// CHECK-NEXT:  %2 = StorePropertyLooseInst %1: object, globalObject: object, "main": string
// CHECK-NEXT:  %3 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function main(): undefined
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = CreateFunctionInst (:object) %foo(): string
// CHECK-NEXT:  %1 = CallInst (:string) %0: object, %foo(): string, empty: any, undefined: undefined, undefined: undefined, 2: number
// CHECK-NEXT:  %2 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function foo(p1: any): string [allCallsitesKnownInStrictMode]
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %p1: any
// CHECK-NEXT:  %1 = BinaryAddInst (:string) "value": string, %0: any
// CHECK-NEXT:  %2 = ReturnInst %1: string
// CHECK-NEXT:function_end