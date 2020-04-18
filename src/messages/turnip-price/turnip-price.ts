const MessageRegex = /^[Tt]urnip price(?:\:)? (\d{1,3})$/;

export const isTurnipPriceMessage = (messageContent: string): boolean => {
    return MessageRegex.test(messageContent);
};

export const parseTurnipMessage = (messageContent: string): number => {
    const matches = MessageRegex.exec(messageContent);
    if (matches === null) {
        throw new Error('Parsing turnip price message failed, this should not be possible');
    }
    return parseInt(matches[1], 10);
};
