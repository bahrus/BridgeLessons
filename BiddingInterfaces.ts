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
    //biddingSuit?: Suits,
}

interface OpeningHand extends Hand{
    openingBid?: string,
    openingSuit?: Suits,
}

interface RespondingHand extends Hand, MajorSuitInvitationHand{
    onlyIfOpeningHand?: Hand[], 
    respondingBid?: string,
    respondingSuit?: Suits,
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