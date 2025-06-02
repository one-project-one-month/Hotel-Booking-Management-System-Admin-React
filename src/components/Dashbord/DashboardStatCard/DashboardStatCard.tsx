import type { JSX } from "react";
import type { LucideProps } from "lucide-react";

interface Props {
    bgColor: string;
    count: number;
    label: string;
    Icon: (props: LucideProps) => JSX.Element;
}
export default function DashboardStatCard({
                                              bgColor,
                                              count,
                                              label,
                                              Icon,
                                          }: Props) {
    return (
        <div
            className={`bg-[ ${bgColor} flex items-center justify-center rounded-md shadow-lg text-white`}
        >
            <div className="flex items-center gap-5">
                <div>
                    <h3 className="text-2xl font-bold">{count}</h3>
                    <p>{label}</p>
                </div>
                <div>
                    <Icon size={30} />
                </div>
            </div>
        </div>
    );
}
