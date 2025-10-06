import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

const CompanyOverview: React.FC = () => {
    return (
        <div className="py-[40px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Company Overview Section */}
                <div className='col-span-2 bg-white p-[20px] rounded-[14px]'>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Company Overview
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Nulla hac id nec at pellentesque
                        maecenas faucibus. Nullam blandit tellus sapien donec cras leo at urna. In
                        aliquam a in et faucibus elit tristique. Habitant pharetra viverra vel dapibus a
                        porttitor. Mauris in turpis te maecenas blandit bibendum convallis sociis
                        eget. Diam molestie id cursus bibendum vestibulum ullamcorper amet risus ac. Mi
                        sed quisque at volutpat velit gravida lobortis purus odio. Vel scelerisque
                        tempus orci tincidunt in turpis diam orci adipiscing.
                    </p>
                </div>

                {/* Contact Information Section */}
                <div className='col-span-1 bg-white p-[20px] rounded-[10px]'>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Contact Information
                    </h2>
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                <Mail  width={20} height={23} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Email</h3>
                                <p className="text-sm text-gray-600">james@gmail.com</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                <Phone width={20} height={23} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Phone</h3>
                                <p className="text-sm text-gray-600">+00 123 456 789</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                <MapPin  width={20} height={23} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">Address</h3>
                                <p className="text-sm text-gray-600">Sunnyvale, California, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyOverview;