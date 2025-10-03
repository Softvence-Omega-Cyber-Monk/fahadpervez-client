import React from 'react';

const ProductDetails: React.FC = () => {
    return (
        <div className="">
            <div className="space-y-8">
                {/* Description Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Description
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Nibh nisl fermentum auctor sed mollis lectus
                        amet. At vitae non egestas blandit id praesent. Ut ac vitae fermentum leo vestibulum morbi
                        urna ultricies. Quis malesuada purus ac volutpat pretium. Nec aliquam nullam pellentesque
                        posuere nisl morbi convallis. Tempus tellus risus nunc volutpat tellus maecenas faucibus. At
                        risus mauris nisl mi dictum neque.
                    </p>
                </div>

                {/* Suggested Use Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Suggested use
                    </h2>
                    <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-4">
                        <p>
                            Lorem ipsum dolor sit amet consectetur. Nibh nisl fermentum auctor sed mollis lectus
                            amet. At vitae non egestas blandit id praesent. Ut ac vitae fermentum leo vestibulum morbi
                            urna ultricies. Quis malesuada purus ac volutpat pretium. Nec aliquam nullam pellentesque
                            posuere nisl morbi convallis. Tempus tellus risus nunc volutpat tellus maecenas faucibus. At
                            risus mauris nisl mi dictum neque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur. Nibh nisl fermentum auctor sed mollis lectus
                            amet. At vitae non egestas blandit id praesent. Ut ac vitae fermentum leo vestibulum morbi
                            urna ultricies. Quis malesuada purus ac volutpat pretium. Nec aliquam nullam pellentesque
                            posuere nisl morbi convallis. Tempus tellus risus nunc volutpat tellus maecenas faucibus. At
                            risus mauris nisl mi dictum neque.
                        </p>
                    </div>
                </div>

                {/* Other Ingredients Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Other Ingredients
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Nibh nisl fermentum auctor sed mollis lectus
                        amet. At vitae non egestas blandit id praesent.
                    </p>
                </div>

                {/* Warnings Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Warnings
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Nibh nisl fermentum auctor sed mollis lectus
                        amet. At vitae non egestas blandit id praesent. Lorem ipsum dolor sit amet consectetur.
                        Nibh nisl fermentum auctor sed mollis lectus amet. At vitae non egestas blandit id praesent.
                    </p>
                </div>

                {/* Disclaimer Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Disclaimer
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Nibh nisl fermentum auctor sed mollis lectus
                        amet. At vitae non egestas blandit id praesent. Lorem ipsum dolor sit amet consectetur.
                        Nibh nisl fermentum auctor sed mollis lectus amet. At vitae non egestas blandit id praesent.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;