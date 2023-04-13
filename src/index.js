
String.prototype.toTitleCase = function () {
	return this.toLowerCase().split(' ').map(function (word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}).join(' ');
};

const celestials = [ "cen-tau-ri", "pro-xi-ma", "al-pha", "pro-xi-mus", "ter-ra",
	"sa-turn", "ju-pi-ter", "mer-cu-ry", "ve-nus", "u-ra-nus", "mars",
	"nep-tune", "plu-to", "ni-bi-ru", "tra-pist", "zeus", "aph-ro-dite",
	"a-res", "heph-aes-tus", "ty-phoon", "da-scher", "en-dor", "ka-mi-no",
	"qua-sar", "no-va", "om-ni-sen", "dune", "a-ra-kis", "gla-tius",
	"co-do-mi-ni-um", "dor-sai", "o-si-mio", "he-li-os", "leo", "hein-lein",
	"a-ca-mar", "ach-ra-dy", "a-di-ge-on", "a-las-tria", "al-drea",
	"von-tria", "al-di-bran", "al-ge-ron", "ach-eon", "a-lon-dra",
	"cyg-nus", "a-ri-done", "a-ri-da-ni", "lep-tus", "am-leth", "am-di-vian",
	"om-ri-con", "ma-jo-ris", "mi-no-ris", "leo-nis", "an-do-ria",
	"an-go-sia", "ar-ge-lius", "ar-gus", "per-cii", "pro-me-thi-us",
	"the-os", "ar-ret", "ar-va-da", "au-re-lia", "ba-lon-si", "bar-son",
	"ba-ri-di-on", "ben-zar", "ben-thos", "kup-sic", "bo-kara", "bo-la-rus",
	"bo-ra-dis", "bos-lic", "bren-ta-lia", "bri-toid", "he-lia",
	"cal-do-nia", "cal-dos", "cal-leb", "ca-li-os", "ca-mus", "ca-no-pius",
	"car-da-sia", "cas-tal", "ca-tu-lia", "ce-ti", "cor-van", "co-ri-dan",
	"cyg-nia", "cyg-net", "da-ka-ra", "da-lan", "da-nu-la", "oxi-lia",
	"dav-los", "de-cos", "de-des-tris", "cen-tris", "cat-los", "der-bia",
	"der-mi-nia", "de-ni-us", "nig-mus", "stag-ni-us", "spho-li-us",
	"shpo-rio", "dre-on", "val-les", "al-pes", "al-pus", "xar-ria",
	"cor-do-via", "met-ne-ria", "cos-ma-dov", "ju-ne-ria", "del-ta",
	"o-rio-na", "ci-ca-da", "am-ne-li-um", "noe-li-um", "au-ra",
	"au-ro-ra", "em-bo-ria", "phan-tax", "ob-lox", "ob-li-via", "za-thu-ra",
	"ar-chea", "cen-tus", "ep-si-lon", "au-pho-ria", "au-ro-ria",
	"ma-ri-dia", "po-tel-mia", "hy-pho-ria", "ti-tan", "la-vi-tan",
	"no-mi-cron", "mag-nus", "kep-lar", "del-phi", "nim-bus", "am-phus",
	"mor-phus", "lamb-dus", "dus-to-pia", "mo-pi-um", "mo-li-um",
	"pho-ri-um", "pho-ri-oso", "oso-li-um", "xe-li-um", "so-li-sia",
	"so-lus", "ap-po-lus", "pho-bos", "chro-nos", "as-tos", "seg-mos",
	"co-los", "dei-mos", "cog-nus", "sig-mus", "co-ro-li-os", "pe-ri-li-os",
	"sep-tus", "mes-mus", "op-tus", "ne-bu-lus", "hec-tus", "me-gus",
	"gi-gus", "te-rus", "pe-tus", "lu-mus", "pri-mus", "op-ti-mus",
	"ori-gus", "xe-lo-phus", "meg-lo-vus", "al-pha-ni-us", "es-la-var",
	"cel-les-ti-us", "stel-le-ra-sus", "ra-le-os", "pa-go-ya", "pul-sar" ]

const syllables = celestials.map(celestial => celestial.split('-')).flat();

const total_syllables = syllables.length;

const unique = (arr) => [ ...new Set(arr) ];

const unique_syllables = unique(syllables);

const div_index = unique_syllables.length / total_syllables;

const size = unique_syllables.length + 1;

const createMatrix = (rows, cols, defaultValue = 0) => {
	return new Array(rows).fill(null).map(() => new Array(cols).fill(defaultValue));
};

const freq = createMatrix(size, size);

for (const p of celestials) {
	const lex = p.split("-");
	const lex_indices = lex.map(syllable => unique_syllables.indexOf(syllable));

	if (lex_indices.length > 1) {
		const row_indices = lex_indices.slice(0, -1);
		const col_indices = lex_indices.slice(1);

		for (let i = 0; i < row_indices.length; i++) {
			freq[ row_indices[ i ] ][ col_indices[ i ] ] += 1;
		}
	}

	const last_syllable_index = lex_indices[ lex_indices.length - 1 ];
	freq[ last_syllable_index ][ size - 1 ] += 1;
}
const suffixes = [
	"prime", "",
	"B", "",
	"alpha", "",
	"proxima", "",
	"IV", "",
	"V", "",
	"C", "",
	"VI", "",
	"VII", "",
	"VIII", "",
	"X", "",
	"IX", "",
	"D", "",
	"", ""
];

/**
 * Given the number of celestial monikers to genereate, return
 * an array of monikers.
 * 
 * [Original algorithm](https://github.com/sayamqazi/planet-name-generator)
 * 
 * @param {int} num_celestials numbner of celstial monikers to generate
 * @returns {string[]}
 */
export function generate_celestial_monikers(num_celestials) {

	const max_names = num_celestials;
	let num_names = 0;
	let celestial_name = "";

	const generated_celestial_names = [];

	while (num_names < max_names) {

		let length = Math.floor(Math.random() * 2) + 2;
		let initial = Math.floor(Math.random() * (size - 2));

		celestial_name = "";
		while (length > 0) {
			while (freq[ initial ].every(value => value !== 1)) {
				initial = Math.floor(Math.random() * (size - 2));
			}

			celestial_name += unique_syllables[ initial ];
			initial = freq[ initial ].findIndex(value => value === 1);
			length -= 1;
		}

		const suffix_index = Math.floor(Math.random() * suffixes.length);
		celestial_name = celestial_name.toTitleCase() + ' ' + suffixes[ suffix_index ];
		generated_celestial_names.push(celestial_name.trim());

		num_names += 1;

	}

	return generated_celestial_names

}
