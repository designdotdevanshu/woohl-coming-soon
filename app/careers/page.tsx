import { redirect } from "next/navigation";

const CAREERS_URL = process.env.NEXT_PUBLIC_CAREERS_URL!;

const CareersPage = () => redirect(CAREERS_URL);

export default CareersPage;