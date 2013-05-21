if (!this.standard_library) {
	this.standard_library = {};
}
if (!standard_library.language) {
	standard_library.language = {};
}
standard_library.language.English = {
	"ConjugateVerb" : function(subject, thirdPersonSingular) {
		if (subject.toLowerCase() === "you" || Utils.IsPlural(subject)) {
			if (thirdPersonSingular === "is")
				return "are";
			else if (thirdPersonSingular === "does")
				return "do";
			else
				return thirdPersonSingular.substring(0,
						thirdPersonSingular.length - 1);
		} else {
			return thirdPersonSingular;
		}
	}
};