import { AngularEditorConfig } from "@kolkov/angular-editor";

// Editor configuration
export const Config: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: "15rem",
  minHeight: "5rem",
  placeholder: "Enter text here...",
  translate: "no",
  defaultParagraphSeparator: "p",
  defaultFontName: "Arial",
  toolbarHiddenButtons: [["bold"]]
};
