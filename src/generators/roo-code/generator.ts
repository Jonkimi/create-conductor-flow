import { ConfigurableGenerator } from "../ConfigurableGenerator.js";
import { rooCodeConfig } from "./config.js";

export class RooCodeGenerator extends ConfigurableGenerator {
	constructor() {
		super(rooCodeConfig);
	}
}
