/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermesc -hermes-parser -dump-ir %s -O0 | %FileCheckOrRegen %s --match-full-lines
// RUN: %hermesc -hermes-parser -dump-ir %s -O

// This is an example of a JSON file from json.org:
// http://json.org/example.html
var json = {
    "glossary": {
        "title": "example glossary",
    "GlossDiv": {
            "title": "S",
      "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
          "SortAs": "SGML",
          "GlossTerm": "Standard Generalized Markup Language",
          "Acronym": "SGML",
          "Abbrev": "ISO 8879:1986",
          "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
            "GlossSeeAlso": ["GML", "XML"]
                    },
          "GlossSee": "markup"
                }
            }
        }
    }
};

// Auto-generated content below. Please do not modify manually.

// CHECK:function global(): any
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = DeclareGlobalVarInst "json": string
// CHECK-NEXT:  %1 = AllocStackInst (:any) $?anon_0_ret: any
// CHECK-NEXT:  %2 = StoreStackInst undefined: undefined, %1: any
// CHECK-NEXT:  %3 = AllocArrayInst (:object) 2: number, "GML": string, "XML": string
// CHECK-NEXT:  %4 = AllocObjectLiteralInst (:object) "para": string, "A meta-markup language, used to create markup languages such as DocBook.": string, "GlossSeeAlso": string, %3: object
// CHECK-NEXT:  %5 = AllocObjectLiteralInst (:object) "ID": string, "SGML": string, "SortAs": string, "SGML": string, "GlossTerm": string, "Standard Generalized Markup Language": string, "Acronym": string, "SGML": string, "Abbrev": string, "ISO 8879:1986": string, "GlossDef": string, %4: object, "GlossSee": string, "markup": string
// CHECK-NEXT:  %6 = AllocObjectLiteralInst (:object) "GlossEntry": string, %5: object
// CHECK-NEXT:  %7 = AllocObjectLiteralInst (:object) "title": string, "S": string, "GlossList": string, %6: object
// CHECK-NEXT:  %8 = AllocObjectLiteralInst (:object) "title": string, "example glossary": string, "GlossDiv": string, %7: object
// CHECK-NEXT:  %9 = AllocObjectLiteralInst (:object) "glossary": string, %8: object
// CHECK-NEXT:  %10 = StorePropertyLooseInst %9: object, globalObject: object, "json": string
// CHECK-NEXT:  %11 = LoadStackInst (:any) %1: any
// CHECK-NEXT:  %12 = ReturnInst %11: any
// CHECK-NEXT:function_end