# template_engine

To run:

```bash
bun run index.ts
```
# Custom Template Engine for AI Prompt Management

This project introduces a custom template engine designed to simplify the process of managing AI prompts. Instead of manually creating and updating numerous constants for each prompt, this engine allows for dynamic and reusable template-based prompt management. It makes prompt changes easier and more efficient, especially in projects with frequent prompt modifications.

## Why This Engine?

In AI-related projects, prompts are a fundamental part of interacting with language models, but managing them can become cumbersome when each change requires creating a new constant. The template engine solves this issue by enabling dynamic prompt generation and reducing the need to manually define and adjust constants every time a change is required.

## Features

- **Dynamic Prompt Replacement**: Automatically replace placeholders in prompts with values from an object.
- **Easy Updates**: Modify the template once, and the values can be updated without changing the constant definitions each time.
- **Cleaner Code**: Avoid cluttering your codebase with numerous constants for each prompt.
- **Reusable Templates**: Reuse templates for different prompts by passing in different data objects.
- **Simple Syntax**: Uses a straightforward template syntax for placeholders, conditionals, and enumerations.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
``` 

``` js
import { process } from './templateEngine'; // Adjust the import path as needed

const promptData = {
  userName: "John Doe",
  task: "analyzing data",
  deadline: "2024-12-25"
};

const templatePath = "./prompt_template.ly"; // Path to your template file

// Process the prompt template
const result = await process(templatePath, promptData);

// Output the processed result
console.log(result);

```
## Examples
### input template
```sh
%enum%
. Step 1: Prepare the data
. Step 2: Clean the data and optimize it
.. Sub Step 2 : clean the data
.. Sub Step 2 : optimize the data
. Step 3: Analyze the data
%endenum%

%if(userName)%
Hello, {userName}!
%endif%

The task at hand is: {task}.
Deadline: {deadline}.

```
## Data object

``` js
const promptData = {
  userName: "John Doe",
  task: "analyzing data",
  deadline: "2024-12-25"
};

```
## Processed Output

```
1. Step 1: Prepare the data
2. Step 2: Clean the data
2.1. Sub Step 2 :clean the data
2.2. Sub Step 2 : Optimize the data
3. Step 3: Analyze the data

Hello, John Doe!

The task at hand is: analyzing data.
Deadline: 2024-12-25.

```
