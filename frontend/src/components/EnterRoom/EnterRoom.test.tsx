import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom";
import { setupStore } from "store/store";
import EnterRoom from "./EnterRoom"

describe('EnterRoomTest', () => {
    const store = setupStore();
    test('render', () => {
        render(
            <MemoryRouter>        <Provider store={store}>
            <EnterRoom />
        </Provider></MemoryRouter>
        )
        expect(screen.getByTestId('enter-room__button')).toBeInDocument
        expect(screen.getByTestId('enter-room__name')).toBeInDocument
        expect(screen.getByTestId('enter-room__password')).toBeInDocument
    })
})