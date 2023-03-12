export const languageAutocompletions = {
  'cpp': [
    {
      label: "#include", type: "keyword", detail: "<stdio.h>",
      info: "Insert standard header file", apply: "#include <stdio.h>"
    },
    {label: "match", type: "keyword"},
    {label: "hello", type: "variable", info: "(World)"},
    { label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" },
    {label: "add",
    type: "function",
    apply: "function add(a, b) {\n  return a + b;\n}"},
    {label: "func",
      type: "function",
      apply: "function ${name}(params) {\n  return r;\n}",
      hint: "Enter function name"},
    {label: "add",
      type: "function",
      apply: "function add(a, b) {\n  return a + b;\n}"
    },
    {label: "add",
      type: "function",
      apply: "function add(a, b) {\n  return a + b;\n}"},
],
  'java': [
    {label: "jav", type: "keyword"},
  ]
}