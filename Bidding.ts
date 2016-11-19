const balanced = {

} as Hand
const Pass = 'Pass';
/////////////////////////////////   Opening  /////////////////////////////////////////////////////////////
const openersHand = {} as Hand;
const openingNoTrump = {
    One:{
        shape: balanced,
        HCPMin: 15,
        HCPMax: 17,
        bid: '1NT'
    } as OpeningHand,
    Two:{
        shape: balanced,
        HCMin: 20,
        HCMax: 21,
        bid: '2NT'
    } as OpeningHand
};

const openingOneOfASuit = {
    onlyIfNot: [openingNoTrump.One, openingNoTrump.Two],
    HCPMin:12,
    HCMax: 21    
} as Hand;

const openingOneSpade = {
    onlyIf: [openingOneOfASuit],
    openingSuit: Suits.Spades,
    MinNumberInSuit: 5,
    openingBid: '1♠'
} as OpeningHand;

const openingOneHeart = {
    onlyIf: [openingOneOfASuit],
    onlyIfNot: [openingOneSpade],
    biddingSuit: Suits.Hearts,
    MinNumberInSuit: 5,
    openingBid: '1❤'
} as OpeningHand;

const openingOneDiamond = {
    onlyIf: [openingOneOfASuit],
    onlyIfNot: [openingOneSpade,openingOneHeart],
    biddingSuit: Suits.Diamonds,
    MinNumberInSuit: 4,
    openingBid: '1♦'
} as OpeningHand;

const openingOneClub = {
    onlyIf: [openingOneOfASuit],
    onlyIfNot: [openingOneSpade, openingOneHeart, openingOneDiamond],
    biddingSuit: Suits.Clubs,
    MinNumberInSuit: 3,
    openingBid: '1♣'
} as OpeningHand;
///////////////////////////////////////  Opening Competitor //////////////////////////////
const competingWithOpeningSuit = {
    
} as Hand;
//////////////////////////////////////   Responding ///////////////////////////////////////
const respondersHand = {} as Hand;
const respondingToOneNoTrump = {
    Pass:{
        onlyIfOpeningHand: [openingNoTrump.One],
        HCPMin: 0,
        HCPMax: 7,
        respondingBid: Pass
    } as RespondingHand,
    Stayman:{
        HCPMin: 8,
        respondingBid: '2♣' ,
        MinNoOfAMajorSuit: 4,
        MaxNoOfAMajorSuit: 4,
    } as RespondingHand,
    JacobyTransfer:{
        HCPMin: 0,
        MinNoOfAMajorSuit: 5,
        respondingSuit: respondersHand.NoOfSpades >= 5 ? Suits.Hearts : Suits.Diamonds,
        respondingBid: respondersHand.NoOfSpades >= 5 ? '2❤' : '2♦',
    } as RespondingHand,
    SixCardMajor:{
        ThreeMajor:{
            HCPMin: 8,
            HCPMax: 9
        } as RespondingHand,
        FourMajor: {
            HCPMin: 10,
            HCPMax: 15,
        } as RespondingHand
    },
    TwoNoTrump: null as RespondingHand,
    ThreeNoTrump: null as RespondingHand,
    Slam: null as RespondingHand,
}
const r1NT = respondingToOneNoTrump;
r1NT.TwoNoTrump = {
        onlyIfOpeningHand: [openingNoTrump.One],
        onlyIfNot: [r1NT.Stayman],
        HCPMin: 8,
        HCPMax: 9,
        respondingBid: '2NT'
}
r1NT.ThreeNoTrump = {
    onlyIfOpeningHand: [openingNoTrump.One],
    onlyIfNot: [r1NT.Stayman],
    HCPMin: 10,
    HCPMax: 15,
    respondingBid: '3NT'
}
r1NT.Slam = {
    onlyIfOpeningHand: [openingNoTrump.One],
    onlyIfNot: [r1NT.Stayman],
    HCPMin: 15,
    respondingBid: 'Slam'
}
//////////////// Opener Rebid ////////////////////////////////////////////
const openerResponseToStaymanWithFit = {
    MinNoOfAMajorSuit: 4,
    openerRebiddingBid: openersHand.NoOfHearts >= 4  ? '2❤' : '2♠',
} as OpenerRebiddingHand;

const openerResponseToStaymenWithNoFit = {
    openerRebiddingBid: '2♦'
} as OpenerRebiddingHand;

const openerResponseToJacobiTransfer = {
    openerRebiddingBid: respondingToOneNoTrump.JacobyTransfer.respondingSuit === Suits.Diamonds ? '2❤' : '2♠',
} as OpenerRebiddingHand

//////////////// Responders Rebids ///////////////////////////////////////////

const respondersRebidToOpenerResponseToJacobiTransfer = {
    Pass: {
        HCPMin: 0,
        HCPMax: 7,
    } as Hand,
    TwoNoTrump:{
        HCPMin: 8,
        HCPMax: 9
    },
    ThreeNoTrump:{
        HCPMin: 10,
        HCPMax: 15,
    }
}

