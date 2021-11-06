"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect = require('expect.js');
const Card_1 = require("../builders/Card");
const types_1 = require("../lib/types");
const handCheck_1 = require("./handCheck");
describe('determinePlayerHand', () => {
    describe('Royal Flush', () => {
        it('should discover a Royal Flush in order', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.C),
                new Card_1.Card(13, types_1.Suit.C),
                new Card_1.Card(12, types_1.Suit.C),
                new Card_1.Card(11, types_1.Suit.C),
                new Card_1.Card(10, types_1.Suit.C)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.ROYALFLUSH);
            expect(result.rank).to.equal(10);
        });
        it('should discover a Royal Flush out of order', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.D),
                new Card_1.Card(13, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.ROYALFLUSH);
            expect(result.rank).to.equal(10);
        });
        it('should include exactly 5 cards of the correct suit and value sorted', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(13, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.ROYALFLUSH);
            expect(result.rank).to.equal(10);
            expect(result.cards.length).to.equal(5);
            expect(result.cards.filter(card => card.suit === types_1.Suit.D).length).to.equal(5);
            expect(result.cards.map(card => card.value)).to.eql([14, 13, 12, 11, 10]);
        });
    });
    describe('Straight Flush', () => {
        it('should discover a Straight Flush in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(13, types_1.Suit.C),
                new Card_1.Card(12, types_1.Suit.C),
                new Card_1.Card(11, types_1.Suit.C),
                new Card_1.Card(10, types_1.Suit.C),
                new Card_1.Card(9, types_1.Suit.C),
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result1.rank).to.equal(9);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(6, types_1.Suit.D),
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result2.rank).to.equal(9);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(6, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.H),
                new Card_1.Card(2, types_1.Suit.H),
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result3.rank).to.equal(9);
        });
        it('should discover a Straight Flush out of order', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.D),
                new Card_1.Card(13, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result.rank).to.equal(9);
        });
        it('should discover a Straight Flush with a low Ace', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(14, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result.rank).to.equal(9);
        });
        it('should use the highest value cards if there are 6 in a row', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(6, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result.rank).to.equal(9);
            expect(result.cards.length).to.equal(5);
            expect(result.cards.filter(card => card.suit === types_1.Suit.D).length).to.equal(5);
            expect(result.cards.map(card => card.value)).to.eql([9, 8, 7, 6, 5]);
        });
        it('should use the highest value cards if there are 7 in a row', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(6, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result1.rank).to.equal(9);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.filter(card => card.suit === types_1.Suit.D).length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([10, 9, 8, 7, 6]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(6, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result2.rank).to.equal(9);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.filter(card => card.suit === types_1.Suit.D).length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([10, 9, 8, 7, 6]);
        });
        it('should include exactly 5 cards of the correct suit and value sorted', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(13, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHTFLUSH);
            expect(result.rank).to.equal(9);
            expect(result.cards.length).to.equal(5);
            expect(result.cards.filter(card => card.suit === types_1.Suit.D).length).to.equal(5);
            expect(result.cards.map(card => card.value)).to.eql([13, 12, 11, 10, 9]);
        });
    });
    describe('Four Of A Kind', () => {
        it('should discover a 4 of a Kind in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(13, types_1.Suit.C),
                new Card_1.Card(13, types_1.Suit.D),
                new Card_1.Card(13, types_1.Suit.H),
                new Card_1.Card(13, types_1.Suit.S),
                new Card_1.Card(6, types_1.Suit.C),
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result1.rank).to.equal(8);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(4, types_1.Suit.C),
                new Card_1.Card(4, types_1.Suit.S),
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result2.rank).to.equal(8);
        });
        it('should discover a 4 of a Kind out of order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result1.rank).to.equal(8);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.C),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.S)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result2.rank).to.equal(8);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.C),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H)
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result3.rank).to.equal(8);
        });
        it('should include exactly 5 cards of the correct values sorted', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.S)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result1.rank).to.equal(8);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([10, 10, 10, 10, 9]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(6, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(6, types_1.Suit.C),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(6, types_1.Suit.H),
                new Card_1.Card(6, types_1.Suit.S),
                new Card_1.Card(13, types_1.Suit.D)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result2.rank).to.equal(8);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([6, 6, 6, 6, 13]);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.S)
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.FOURKIND);
            expect(result3.rank).to.equal(8);
            expect(result3.cards.length).to.equal(5);
            expect(result3.cards.map(card => card.value)).to.eql([2, 2, 2, 2, 5]);
        });
    });
    describe('Full House', () => {
        it('should discover a Full House in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result1.rank).to.equal(7);
        });
        it('should discover a Full House out of order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(5, types_1.Suit.C),
                new Card_1.Card(10, types_1.Suit.H)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result1.rank).to.equal(7);
        });
        it('should use the higher of 3 of a kind if 2 exist', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.C),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.C),
                new Card_1.Card(4, types_1.Suit.S)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result1.rank).to.equal(7);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([8, 8, 8, 4, 4]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(4, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.S)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result2.rank).to.equal(7);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([4, 4, 4, 2, 2]);
        });
        it('should use the higher pair if 2 exist', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.S)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result1.rank).to.equal(7);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([8, 8, 8, 4, 4]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.S)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result2.rank).to.equal(7);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([2, 2, 2, 8, 8]);
        });
        it('should include exactly 5 cards of the correct suit and value sorted', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.S)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result1.rank).to.equal(7);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([2, 2, 2, 5, 5]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.S)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FULLHOUSE);
            expect(result2.rank).to.equal(7);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([8, 8, 8, 4, 4]);
        });
    });
    describe('Flush', () => {
        it('should discover a Flush in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(9, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FLUSH);
            expect(result1.rank).to.equal(6);
        });
        it('should discover a Flush out of order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.C),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FLUSH);
            expect(result1.rank).to.equal(6);
        });
        it('should use the 5 highest value cards if there are 6', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.S),
                new Card_1.Card(11, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(8, types_1.Suit.S),
                new Card_1.Card(2, types_1.Suit.S),
                new Card_1.Card(5, types_1.Suit.S),
                new Card_1.Card(9, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FLUSH);
            expect(result1.rank).to.equal(6);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.filter(card => card.suit === types_1.Suit.S).length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([14, 11, 10, 8, 5]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FLUSH);
            expect(result2.rank).to.equal(6);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.filter(card => card.suit === types_1.Suit.D).length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([14, 11, 10, 8, 5]);
        });
        it('should use the 5 highest value cards if there are 7', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(9, types_1.Suit.H)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FLUSH);
            expect(result1.rank).to.equal(6);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.filter(card => card.suit === types_1.Suit.H).length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([14, 11, 10, 9, 8]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.FLUSH);
            expect(result2.rank).to.equal(6);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.filter(card => card.suit === types_1.Suit.D).length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([14, 11, 10, 9, 8]);
        });
        it('should include exactly 5 cards of the correct suit and value sorted', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.C),
                new Card_1.Card(11, types_1.Suit.C),
                new Card_1.Card(10, types_1.Suit.C),
                new Card_1.Card(8, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.C),
                new Card_1.Card(9, types_1.Suit.D)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.FLUSH);
            expect(result1.rank).to.equal(6);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.filter(card => card.suit === types_1.Suit.C).length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([14, 11, 10, 8, 5]);
        });
    });
    describe('Straight', () => {
        it('should discover a Straight Flush in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(13, types_1.Suit.C),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(9, types_1.Suit.C),
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result1.rank).to.equal(5);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.C),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(6, types_1.Suit.S),
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result2.rank).to.equal(5);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(6, types_1.Suit.S),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.S),
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result3.rank).to.equal(5);
        });
        it('should discover a Straight Flush out of order', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(13, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result.rank).to.equal(5);
        });
        it('should discover a Straight Flush with a low Ace', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.S),
                new Card_1.Card(4, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(14, types_1.Suit.S)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result.rank).to.equal(5);
        });
        it('should use the highest value cards if there are 6 in a row', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(6, types_1.Suit.S),
                new Card_1.Card(8, types_1.Suit.D),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.C),
                new Card_1.Card(9, types_1.Suit.C),
                new Card_1.Card(4, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result.rank).to.equal(5);
            expect(result.cards.length).to.equal(5);
            expect(result.cards.map(card => card.value)).to.eql([9, 8, 7, 6, 5]);
        });
        it('should use the highest value cards if there are 7 in a row', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.C),
                new Card_1.Card(9, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.C),
                new Card_1.Card(7, types_1.Suit.S),
                new Card_1.Card(6, types_1.Suit.S),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result1.rank).to.equal(5);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([10, 9, 8, 7, 6]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(6, types_1.Suit.C),
                new Card_1.Card(8, types_1.Suit.C),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(7, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(9, types_1.Suit.D),
                new Card_1.Card(4, types_1.Suit.D)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result2.rank).to.equal(5);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([10, 9, 8, 7, 6]);
        });
        it('should include exactly 5 cards of the correct suit and value sorted', () => {
            const result = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.S),
                new Card_1.Card(9, types_1.Suit.C),
                new Card_1.Card(12, types_1.Suit.C),
                new Card_1.Card(2, types_1.Suit.H),
                new Card_1.Card(13, types_1.Suit.D)
            ]);
            expect(result.title).to.equal(types_1.HandTitles.STRAIGHT);
            expect(result.rank).to.equal(5);
            expect(result.cards.length).to.equal(5);
            expect(result.cards.map(card => card.value)).to.eql([13, 12, 11, 10, 9]);
        });
    });
    describe('Three of a Kind', () => {
        it('should discover a 3 of a Kind in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.S),
                new Card_1.Card(4, types_1.Suit.S),
                new Card_1.Card(3, types_1.Suit.D)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.THREEKIND);
            expect(result1.rank).to.equal(4);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(8, types_1.Suit.S),
                new Card_1.Card(8, types_1.Suit.C),
                new Card_1.Card(3, types_1.Suit.D)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.THREEKIND);
            expect(result2.rank).to.equal(4);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(6, types_1.Suit.S),
                new Card_1.Card(6, types_1.Suit.C),
                new Card_1.Card(6, types_1.Suit.D)
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.THREEKIND);
            expect(result3.rank).to.equal(4);
        });
        it('should discover a 3 of a Kind out of order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(6, types_1.Suit.S),
                new Card_1.Card(6, types_1.Suit.C),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(6, types_1.Suit.D)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.THREEKIND);
            expect(result1.rank).to.equal(4);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(8, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.S),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.C)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.THREEKIND);
            expect(result2.rank).to.equal(4);
        });
        it('should include exactly 5 cards of the correct value sorted', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.D),
                new Card_1.Card(6, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.C),
                new Card_1.Card(13, types_1.Suit.S),
                new Card_1.Card(6, types_1.Suit.C),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(6, types_1.Suit.D)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.THREEKIND);
            expect(result1.rank).to.equal(4);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([6, 6, 6, 14, 13]);
        });
    });
    describe('Two Pair', () => {
        it('should discover 2 Pair in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result1.rank).to.equal(3);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.C)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result2.rank).to.equal(3);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.C),
                new Card_1.Card(4, types_1.Suit.S)
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result3.rank).to.equal(3);
        });
        it('should discover 2 Pair out of order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result1.rank).to.equal(3);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.C)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result2.rank).to.equal(3);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.H),
                new Card_1.Card(4, types_1.Suit.S),
                new Card_1.Card(11, types_1.Suit.C),
                new Card_1.Card(10, types_1.Suit.H)
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result3.rank).to.equal(3);
        });
        it('should discover the highest 2 pairs if 3 pairs exist', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result1.rank).to.equal(3);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([12, 12, 10, 10, 7]);
        });
        it('should include exactly 5 cards of the correct value sorted', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(10, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.TWOPAIR);
            expect(result1.rank).to.equal(3);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([10, 10, 5, 5, 12]);
        });
    });
    describe('Pair', () => {
        it('should discover a Pair in order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(14, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.PAIR);
            expect(result1.rank).to.equal(2);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(7, types_1.Suit.S),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(14, types_1.Suit.C)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.PAIR);
            expect(result2.rank).to.equal(2);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.S),
                new Card_1.Card(14, types_1.Suit.H),
                new Card_1.Card(14, types_1.Suit.C)
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.PAIR);
            expect(result3.rank).to.equal(2);
        });
        it('should discover a Pair out of order', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.D),
                new Card_1.Card(14, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.PAIR);
            expect(result1.rank).to.equal(2);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(14, types_1.Suit.C),
                new Card_1.Card(7, types_1.Suit.S)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.PAIR);
            expect(result2.rank).to.equal(2);
            const result3 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(3, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(8, types_1.Suit.S),
                new Card_1.Card(14, types_1.Suit.C)
            ]);
            expect(result3.title).to.equal(types_1.HandTitles.PAIR);
            expect(result3.rank).to.equal(2);
        });
        it('should include exactly 5 cards of the correct value sorted', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(5, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.PAIR);
            expect(result1.rank).to.equal(2);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([5, 5, 12, 11, 10]);
        });
    });
    describe('High Card', () => {
        it('should include exactly 5 cards of the correct value sorted', () => {
            const result1 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(5, types_1.Suit.H),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H),
                new Card_1.Card(14, types_1.Suit.C)
            ]);
            expect(result1.title).to.equal(types_1.HandTitles.HIGHCARD);
            expect(result1.rank).to.equal(1);
            expect(result1.cards.length).to.equal(5);
            expect(result1.cards.map(card => card.value)).to.eql([14, 12, 11, 10, 7]);
            const result2 = (0, handCheck_1.determinePlayerHand)([
                new Card_1.Card(14, types_1.Suit.H),
                new Card_1.Card(12, types_1.Suit.S),
                new Card_1.Card(2, types_1.Suit.D),
                new Card_1.Card(11, types_1.Suit.D),
                new Card_1.Card(9, types_1.Suit.C),
                new Card_1.Card(7, types_1.Suit.D),
                new Card_1.Card(10, types_1.Suit.H)
            ]);
            expect(result2.title).to.equal(types_1.HandTitles.HIGHCARD);
            expect(result2.rank).to.equal(1);
            expect(result2.cards.length).to.equal(5);
            expect(result2.cards.map(card => card.value)).to.eql([14, 12, 11, 10, 9]);
        });
    });
});
//# sourceMappingURL=handCheck.test.js.map