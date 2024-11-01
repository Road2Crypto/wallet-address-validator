import { testCosmos } from '../src/validation/address'

describe('solanaAddressRegex', () => {
    test('validAddresses', () => {
        const validSolanaAddresses = [
            'cosmos1sregzcxh7aagzndr462v9mg42sn5qp6f7cugme'
        ]
        validSolanaAddresses.forEach(address => {
            expect(testCosmos().test(address)).toBe(true)
        })
    })

    test('invalidAddresses', () => {
        const invalidSolanaAddresses = [
            '4Nd1mQ2foW7qSwk89NzVFTva9UtaYenEF69k1ysEVnnK3m', // too long
            'InvalidSolanaAddress12345',
        ]
        invalidSolanaAddresses.forEach(address => {
            expect(testCosmos().test(address)).toBe(false)
        })
    })
})
