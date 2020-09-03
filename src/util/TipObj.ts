import ora, { Ora } from "ora";

export class TipObj {
  private spinner: Ora;
  constructor() {
    this.spinner = ora();
  }

  loading(text) {
    const spinner = this.spinner;
    spinner.start(text);
  }

  success(text) {
    const spinner = this.spinner;
    spinner.succeed(text);
  }

  fail(text) {
    const spinner = this.spinner;
    spinner.fail(text);
  }

  warn(text) {
    const spinner = this.spinner;
    spinner.warn(text);
  }

  stop() {
    const spinner = this.spinner;
    spinner.stop();
  }
}

