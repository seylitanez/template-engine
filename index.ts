export type Object = {
  [key: string]: any;
};

async function process(path: string, obj: Object) {
  try {
    const content = await readFileContent(path);
    const replacedContent = replacePlaceholders(content, obj);
    const filteredContent = filterLinesWithoutPlaceholders(replacedContent);
    const cleanedContent = removeIfStatements(filteredContent, obj);
    const enumratedContent = enumerateEnumLines(cleanedContent);

    return removeComments(enumratedContent);
  } catch (error) {
    console.error("Error during processing:", error);
    throw new Error("Failed to process the file.");
  }
}

// Reading the content of the file
async function readFileContent(path: string): Promise<string> {
  const file = Bun.file(path);
  return await file.text();
}

// Replacing placeholders in the content with values from the object
function replacePlaceholders(content: string, obj: Object): string {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    content = content.replace(`{${key}}`, obj[key]);
  });
  return content;
}

// Filtering lines that do not contain placeholders
function filterLinesWithoutPlaceholders(content: string): string {
  return content
    .split('\n')
    .filter((line) => !line.match(/\{(\w+)\}/))
    .join('\n');
}

// Removing %if% and %endif% for excluded keywords
function removeIfStatements(content: string, obj: Object): string {
  const excludedWords = Object.keys(obj);
  const excludedWordsPattern = excludedWords.join('|');
  const ifBodyRegex = new RegExp(`%if\\((?!(${excludedWordsPattern}))\\w+\\)%([\\s\\S]*?)%endif%`, 'g');

  const matches = content.match(ifBodyRegex);
  if (matches) {
    matches.forEach((match) => {
      content = content.replace(match, '');
    });
  }
  return content;
}

// Handling %enum% lines and enumerating points
function enumerateEnumLines(content: string): string {
  let enumrations = [0];
  let canEnumerate = false;

  return content
    .split("\n")
    .map((line) => {
      if (line.includes("%enum%")) {
        canEnumerate = true;
      }
      if (canEnumerate && line.includes("%endenum%")) {
        canEnumerate = false;
      }

      const points = line.match(/^(\.+)/gm);
      if (points) {
        const pointsCount = points[0].length;
        while (pointsCount > enumrations.length) {
          enumrations.push(0);
        }
        while (pointsCount < enumrations.length) {
          enumrations.pop();
        }

        enumrations[pointsCount - 1] += 1;
        return line.replace(points[0], enumrations.join(".") + ".");
      }

      return line;
    })
    .join("\n");
}

// Removing comments (%...%)
function removeComments(content: string): string {
  return content.replaceAll(/%.*?%/g, '').trim();
}

const result = await process("./appreciation_prompt.ly", {
  userName: "seylitanez",
  task: "code review",
  deadline: "next week",

});

console.log(result);

