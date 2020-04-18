import { isTurnipPriceMessage } from './turnip-price';

describe('Turnip Price Message', () => {
    it.each`
        messageContent           | result
        ${'Turnip price: 1'}     | ${true}
        ${'Turnip price: 10'}    | ${true}
        ${'Turnip price: 123'}   | ${true}
        ${'turnip price: 123'}   | ${true}
        ${'1'}                   | ${false}
        ${'price is 1'}          | ${false}
        ${'turnip price 1123'}   | ${false}
        ${'turnip price: 11234'} | ${false}
        ${'turnip price: '}      | ${false}
    `("isTurnipPrice('$messageContent') should return $result", ({ messageContent, result }) => {
        expect(isTurnipPriceMessage(messageContent)).toBe(result);
    });
});
