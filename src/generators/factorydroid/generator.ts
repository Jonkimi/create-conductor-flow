import { ConfigurableGenerator } from "../ConfigurableGenerator.js";
import { factoryDroidConfig } from "./config.js";

export class FactoryDroidGenerator extends ConfigurableGenerator {
	constructor() {
		super(factoryDroidConfig);
	}
}
