var balanced = {};
var openingNoTrump = {
    One: {
        shape: balanced,
        HCPMin: 15,
        HCPMax: 17,
        bid: '1NT'
    },
    Two: {
        shape: balanced,
        HCMin: 20,
        HCMax: 21,
        bid: '2NT'
    }
};
var openingOneOfASuit = {
    onlyIfNot: [openingNoTrump.One, openingNoTrump.Two],
    HCPMin: 12,
    HCMax: 21
};
var openingOneSpade = {
    onlyIf: [openingOneOfASuit],
};
//# sourceMappingURL=Bidding.js.map