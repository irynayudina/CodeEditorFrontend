export const languageAutocompletions = {
    'cpp':function myCompletions(context) {
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
          return null
        return {
          from: word.from,
          options: [
            {label: "match", type: "keyword"},
            {label: "hello", type: "variable", info: "(World)"},
              { label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" },
              {
                label: "add",
                type: "function",
                apply: "function add(a, b) {\n  return a + b;\n}"
              },
              {
                label: "func",
                type: "function",
                apply: "function ${name}(params) {\n  return r;\n}",
                hint: "Enter function name"
              },
          ]
        }
    }

}