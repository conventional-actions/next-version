import {Commit} from 'conventional-commits-parser'

export const addBangNotes = (commit: Commit): void => {
  const match = commit.header?.match(/^(\w*)(?:\((.*)\))?!: (.*)$/)
  if (match && commit.notes.length === 0) {
    const noteText = match[3] // the description of the change.
    commit.notes.push({
      text: noteText,
      title: noteText
    })
  }
}
