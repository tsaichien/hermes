/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: LC_ALL=en_US.UTF-8 %hermes -non-strict -O -target=HBC %s | %FileCheck --match-full-lines %s

function exceptionName(l) {
  try {
    l();
  } catch (e) {
    return e.name;
  }

  return undefined;
}

function typeAndValue(v) {
  // printing hex bigints for more sane comparisons.
  return typeof(v) + " " + v.toString(16);
}

print("BigInt Binary <<");
// CHECK-LABEL: BigInt Binary <<

print(exceptionName(numberPlusBigInt));
// CHECK-NEXT: TypeError

print(exceptionName(() => BigInt(1) << 1));
// CHECK-NEXT: TypeError

print(exceptionName(() => 1 << BigInt(1)));
// CHECK-NEXT: TypeError

print(typeAndValue(BigInt(0) << BigInt(10)))
// CHECK-NEXT: bigint 0

print(typeAndValue(BigInt("0x4000000000000000") << BigInt(1)))
// CHECK-NEXT: bigint 8000000000000000

print(typeAndValue(-BigInt("0x4000000000000000") << BigInt(1)))
// CHECK-NEXT: bigint -8000000000000000

print(typeAndValue(BigInt("0x8000000000000000") << BigInt(1)))
// CHECK-NEXT: bigint 10000000000000000

print(typeAndValue(-BigInt("0x8000000000000000") << BigInt(1)))
// CHECK-NEXT: bigint -10000000000000000

print(typeAndValue(BigInt(1) << BigInt(10)))
// CHECK-NEXT: bigint 400

print(typeAndValue(BigInt(-1) << BigInt(10)))
// CHECK-NEXT: bigint -400

print(typeAndValue(BigInt(-1) << BigInt(4 * 64)))
// CHECK-NEXT: bigint -10000000000000000000000000000000000000000000000000000000000000000

print(typeAndValue(BigInt(1) << BigInt(4 * 64 + 32)))
// CHECK-NEXT: bigint 1000000000000000000000000000000000000000000000000000000000000000000000000

function numberPlusBigInt() {
  return (1+(BigInt(2)<<BigInt(1)));
}