import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type RadixDialogProps = {
	trigger: React.ReactNode;
	content: React.ReactNode;
	title: string;
};

function RadixDialog({ trigger, content, title }: RadixDialogProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className=" bg-neutral-900/50 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] bg-neutral-50 dark:bg-neutral-950 translate-y-[-50%] rounded-lg p-6">
					<Dialog.Title className=" text-neutral-900 dark:text-neutral-100 m-0 font-medium text-xl mb-4 text-center">
						{title}
					</Dialog.Title>
					{content}
					<Dialog.Close asChild>
						<button
							type="button"
							className="text-blue-600 hover:bg-blue-600/50 absolute top-3 right-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full"
							aria-label="Close"
						>
							<X />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default RadixDialog;
