import {QueryCancelation, QueryInvalidation, ExamplePrefetching} from '../QueryClientExamples'
import {fireEvent, render, screen, waitFor} from '../utils/test-utils'

describe('QueryClientExamples Tests', () => { 
    test('QueryCancelation: component fetches data', async () => { 
        render(<QueryCancelation/>)
        const text = await screen.findByText("userOne")
        expect(text).toBeInTheDocument()
     })

     test('QueryCancelation: component cancels query fetch', async () => { 
        render(<QueryCancelation/>)
        
        const cancelButton = screen.getByText("Cancel Query")
        fireEvent.click(cancelButton)

        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument())

        const text = screen.queryByText("userOne")
        expect(text).not.toBeInTheDocument()     
    })

    test('QueryInvalidation: component fetches data', async () => { 
        render(<QueryInvalidation/>)
        const text = await screen.findByText("userOne")
        expect(text).toBeInTheDocument()
     })

     test('QueryInvalidation: component invalidates query', async () => { 
        render(<QueryInvalidation/>)
        
        const text = await screen.findByText("userOne")
        expect(text).toBeInTheDocument()

        const invalidateButton = screen.getByText("Invalidate Query")
        fireEvent.click(invalidateButton)
        await waitFor(() => expect(screen.queryByText("userOne")).not.toBeInTheDocument())
        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument())
        
        expect(screen.getByText("userOne")).toBeInTheDocument()
    })
    
    test('ExamplePrefetching: component displays prefetched data', async () => { 
        render(<ExamplePrefetching/>)
        fireEvent.click(screen.getByText("Prefetch Data"))
        const text = await screen.findByText("userOne")
        expect(text).toBeInTheDocument()
     })
     
     test('ExamplePrefetching: component doesnt display loader as data is prefetched', () => { 
        render(<ExamplePrefetching/>)
        fireEvent.click(screen.getByText("Prefetch Data"))
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
     })
 })