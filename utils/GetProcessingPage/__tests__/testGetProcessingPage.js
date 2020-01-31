const processingModule = require('../');
const getProcessingPage = processingModule.getProcessingPage;

describe('getProcessingPage', () => {
    // single item tests

    it('throws error without status', async () => {
        let message = false;
        try {
            await getProcessingPage([{}]);
        } catch (e) {
            message = e.message;
        }
        expect(message).toStrictEqual('status missing');
    });

    it('works for success', async () => {
        expect(await getProcessingPage([{ status: 'success' }])).toStrictEqual({
            title: 'Order complete',
            message: null,
        });
    });

    it('works for error with undefined error code', async () => {
        expect(await getProcessingPage([{ status: 'error' }])).toStrictEqual({
            title: 'Error page',
            message: null,
        });
    });

    it("works for error with 'NO_STOCK' error code", async () => {
        expect(
            await getProcessingPage([
                { status: 'error', errorCode: 'NO_STOCK' },
            ])
        ).toStrictEqual({
            title: 'Error page',
            message: 'No stock has been found',
        });
    });

    it("works for error with 'INCORRECT_DETAILS' error code", async () => {
        expect(
            await getProcessingPage([
                { status: 'error', errorCode: 'INCORRECT_DETAILS' },
            ])
        ).toStrictEqual({
            title: 'Error page',
            message: 'Incorrect details have been entered',
        });
    });

    // with processing test
    it('works for processing and success', async () => {
        expect(
            await getProcessingPage([
                { status: 'processing' },
                { status: 'success' },
            ])
        ).toStrictEqual({ title: 'Order complete', message: null });
    });

    it('works for processing and error with undefined error code', async () => {
        expect(
            await getProcessingPage([
                { status: 'processing' },
                { status: 'error' },
            ])
        ).toStrictEqual({ title: 'Error page', message: null });
    });

    it('works for processing and error with null error code', async () => {
        expect(
            await getProcessingPage([
                { status: 'processing' },
                { status: 'error', errorCode: null },
            ])
        ).toStrictEqual({ title: 'Error page', message: null });
    });

    it("works for processing and error with 'NO_STOCK' error code", async () => {
        expect(
            await getProcessingPage([
                { status: 'processing' },
                { status: 'error', errorCode: 'NO_STOCK' },
            ])
        ).toStrictEqual({
            title: 'Error page',
            message: 'No stock has been found',
        });
    });

    it("works for processing and error with 'INCORRECT_DETAILS' error code", async () => {
        expect(
            await getProcessingPage([
                { status: 'processing' },
                { status: 'error', errorCode: 'INCORRECT_DETAILS' },
            ])
        ).toStrictEqual({
            title: 'Error page',
            message: 'Incorrect details have been entered',
        });
    });
});
