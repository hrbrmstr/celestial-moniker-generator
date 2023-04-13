
import * as assert from "assert";

import { generate_celestial_monikers } from "../src/index.js";

const n = 30
const celestials = generate_celestial_monikers(n)

assert.equal(celestials.length, n)