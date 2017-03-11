interface Hand{
    shape?: any,
    HCPMin?: number,
    HCPMax?: number,
    //bid?: string,
    MinNumberInSuit?: number,
    onlyIf?: Hand[],
    onlyIfNot?: Hand[],
    NoOfHearts?: Number,
    NoOfSpades?: Number,
    MaxNoInSameSuit?: Number,
    //biddingSuit?: Suits,
}

interface OpeningHand extends Hand{
    openingBid?: string,
    openingSuit?: Suits,
}

interface CompetingHand extends Hand{
    onlyIfOpeningHand?: Hand[]
    competingBid?: string,
}

interface RespondingHand extends Hand, MajorSuitInvitationHand{
    onlyIfOpeningHand?: Hand[], 
    respondingBid?: string,
    respondingSuit?: Suits,
    hasFitWithOpeningHand?: boolean,
    PartnerSuitSupportMin?: number,
    PartnerSuitSupportMax?: number,
    minNoOfCardsInLowerSuitThanOpener?: number,
}

interface OpenerRebiddingHand extends Hand{
    openerRebiddingBid?: string,
}

interface MajorSuitInvitationHand extends Hand{
    MinNoOfAMajorSuit?: Number,
    MaxNoOfAMajorSuit?: Number,
}


enum Suits {
    Spades,
    Hearts,
    Diamonds,
    Clubs
}