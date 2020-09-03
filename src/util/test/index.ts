import { travelDir } from "..";
import path from "path";

async function temp() {
  const templatePath = path.join(process.cwd(), "template");
  console.log(templatePath);
  const res = await travelDir(templatePath);
  console.log(res);
}

temp();
