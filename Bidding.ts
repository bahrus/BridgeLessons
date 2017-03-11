const balanced = {

} as Hand;
const balancedWithStoppers  = {

} as Hand;
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
const openingOneSuit = [openingOneSpade, openingOneClub, openingOneDiamond, openingOneHeart];

const preemptiveOpeningBidTwoLevel = {
    HCPMin: 5,
    HCPMax: 9,
    MinNumberInSuit: 6,
    openingBid: '2[S]'
} as OpeningHand;
// Begin Opening Suit Competitor
    const threeCardSupportInAllNonOpeningSuitAndNoMoreThanThreeInOpeningSuit = {};
    const takeoutDouble = {
            onlyIfOpeningHand: openingOneSuit,
            HCPMin: 13,
            shape: threeCardSupportInAllNonOpeningSuitAndNoMoreThanThreeInOpeningSuit,
    } as CompetingHand;
    const overCallOneNT = {
        onlyIfOpeningHand: openingOneSuit,
        onlyIfNot: [takeoutDouble],
        shape: balancedWithStoppers,
        HCPMin: 15,
        HCPMax: 18,
        competingBid: '1NT'
    } as CompetingHand
    const overCallLevelOne = {
        onlyIfOpeningHand: openingOneSuit,
        onlyIfNot: [takeoutDouble],
        HCPMin: 6,
        HCPMax: 17,
        
    } as CompetingHand;
// End Opening Suit Competitor
// Begin Responding to Opener 
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
    const respondingToOneOfASuit = {
        PassLC:{
            HCPMax: 5,
            respondingBid: 'Pass'
        } as RespondingHand,
        PassNoBigHand:{
            MaxNoInSameSuit: 3,
            respondingBid: 'Pass'
        } as RespondingHand,
    }
    const respPasses = [respondingToOneOfASuit.PassLC, respondingToOneOfASuit.PassNoBigHand];
    const openingOneMajor = [openingOneHeart, openingOneSpade];
    const specialResponsesToOneMajor = {
        JumpTo3OfLowerSuit:{
            onlyif:openingOneMajor,
            onlyIfNot: respPasses,
            HCPMin: 10,
            HCPMax: 11,
            minNoOfCardsInLowerSuitThanOpener: 6,
            respondingBid: '3[SuitWith6+]'
        } as RespondingHand,
    }
    const raisingSuitRespondingBids= {
        TwoOfMajorSuit:{
            onlyIf: openingOneMajor,
            onlyIfNot: respPasses,
            HCPMin: 6,
            HCPMax: 9,
            hasFitWithOpeningHand: true,
            PartnerSuitSupportMin: 3,
            PartnerSuitSupportMax: 4,
            respondingBid: '2[PartnerMajorSuit]'
        } as RespondingHand,
        ThreeOfMajorSuit:{
            onlyIf: openingOneMajor,
            onlyIfNot: respPasses,
            HCPMin: 10,
            HCPMax: 12,
            hasFitWithOpeningHand: true,
            PartnerSuitSupportMin: 4,
            PartnerSuitSupportMax: 4,
            respondingBid: '3[PartnerMajorSuit]'
        } as RespondingHand,
        FourOfMajorSuitPreemptiveRaise:{
            onlyIf: openingOneMajor,
            onlyIfNot: respPasses,
            HCPMax: 9,
            PartnerSuitSupportMin: 5,
            respondingBid: '4[PartnerMajorSuit]'
        } as RespondingHand,
    }
    const respondingOneNTToMajor = {
        OneNTForcingWithFit:{
            onlyif: openingOneMajor,
            onlyIfNot: [
                respPasses, 
                raisingSuitRespondingBids.TwoOfMajorSuit, 
                raisingSuitRespondingBids.ThreeOfMajorSuit, 
                raisingSuitRespondingBids.FourOfMajorSuitPreemptiveRaise
            ]
        } as RespondingHand,
        OneNTForcingNoFit:{
            onlyIf:[openingOneHeart, openingOneSpade],
            onlyIfNot: [respPasses, specialResponsesToOneMajor.JumpTo3OfLowerSuit],
            HCPMax: 12,
            HCPMin: 6,
            hasFitWithOpeningHand: false
        } as RespondingHand,
        
        
    } 
//End Responding to Opener
///////////////// Responding to 1HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
///////////////// Responding to Takeout Double ///////////////////////////

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

