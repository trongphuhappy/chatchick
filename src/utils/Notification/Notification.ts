import { HubConnectionState } from "@microsoft/signalr";

export const stopConnection = async (connection: any) => {
    if (connection.state !== HubConnectionState.Disconnected) {
        await connection.stop();
    }
};