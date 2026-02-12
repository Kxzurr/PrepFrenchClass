import { RiArrowRightLongLine } from '@remixicon/react';
import Button from '../../../../common/Button';

export default function CTASection() {
    return (
        <section>
            <div className="container">
                <div className="rounded-3xl bg-primary-500 text-white p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 -mb-12 relative z-10">
                    <div className="text-center ltr:lg:text-left rtl:lg:text-right">
                        <h3 className="text-2xl sm:text-3xl lg:text-5xl leading-snug lg:leading-normal font-semibold mb-2">
                            Ready to Begin Your French Journey?
                        </h3>
                        <p className="text-white/90 mb-0">
                            Join structured online French classes designed for beginners,
                            professionals, and TEF/TCF aspirants. Build confidence,
                            fluency, and real exam readiness step by step.
                        </p>
                    </div>
                    <Button
                        href="contact"
                        variant="primary"
                        className="relative overflow-hidden bg-white text-primary-950 border-white rounded-full shrink-0 w-full sm:w-auto text-center"
                        iconElement={<RiArrowRightLongLine className="align-middle ltr:ml-1 rtl:mr-1" />}
                    >
                        Book a Free Demo Class
                    </Button>
                </div>
            </div>
        </section>
    );
}
