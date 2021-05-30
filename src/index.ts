#!/usr/bin/env node
import { execSync } from 'child_process'
import { ListChoiceOptions, prompt } from 'inquirer'
import rc from 'rc'

type Config = {
  choices: ListChoiceOptions[]
  replaceDefaultChoices: boolean
  a: boolean
  print: boolean
  [key: string]: any
}

type Answers = {
  type: string
  scope: string
  subject: string
  confirm: boolean
}

const DEFAULT_CHOICES: ListChoiceOptions[] = [
  { value: '✨', name: '✨ Affects the UX' },
  { value: '💻', name: '💻 Affects the DX' },
  { value: '🤖', name: '🤖 Related to automated testing' },
  { value: '⏪', name: '⏪ Reverts a previous change' }
]

const config = rc('commit', {
  choices: [],
  replaceDefaultChoices: false,
  a: false,
  print: false
}) as Config

if (config.choices) {
  config.choices = config.choices.map((choice) => ({
    ...choice,
    name: `${choice.value} ${choice.name}`
  }))
}

const choices = config.choices
  ? config.replaceDefaultChoices
    ? config.choices
    : DEFAULT_CHOICES.concat(config.choices)
  : DEFAULT_CHOICES

const getTemplate = (answers: Answers) =>
  [
    answers.type,
    answers.scope ? `(${answers.scope}): ` : ': ',
    answers.subject
  ].join('')

const main = async () => {
  const answers = await prompt<Answers>([
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of the commit:',
      choices
    },
    {
      type: 'input',
      name: 'scope',
      message: 'What is the scope of the change?'
    },
    {
      type: 'input',
      name: 'subject',
      message: 'Write a short description of the change:'
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: (answers) => `Does "${getTemplate(answers)}" look correct?`,
      default: true
    }
  ])

  if (!answers.confirm) return

  const template = getTemplate(answers)

  if (config.print) return console.log(template)

  try {
    if (config.a) {
      execSync('git add --all')
    }

    execSync(
      `/usr/bin/env bash -c 'git commit --template <(echo "${template}")'`,
      { stdio: 'inherit' }
    )
  } catch (err) {
    // if (err.message && err.message.startsWith('Command failed:')) return
    console.error(err.message)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(0)
})
