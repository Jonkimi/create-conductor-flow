import { ConfigurableGenerator } from "../ConfigurableGenerator.js";
import { qwenCodeConfig } from "./config.js";

export class QwenCodeGenerator extends ConfigurableGenerator {
	constructor() {
		super(qwenCodeConfig);
	}
}
