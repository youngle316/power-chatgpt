import MainContainer from "../../MainContainer";

async function ChatPage() {
	const res = await fetch("/data/data.json");
	const data = await res.json();
	console.log("data", data);
	return <MainContainer>this is chat page</MainContainer>;
}

export default ChatPage;
