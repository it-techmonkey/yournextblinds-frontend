'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, Room, MountOption, ProductConfiguration } from '@/types/product';
import ProductGallery from './ProductGallery';
import {
  SizeSelector,
  RoomSelector,
  MountSelector,
  HeadrailSelector,
  OpenStyleSelector,
  WandPositionSelector,
  ValanceSelector,
  DropdownSelector,
  ControlSelector,
  ColourSelector,
  RollerStyleSelector,
  FabricTypeSelector,
  BottomBarSelector,
  LiftSelector,
} from './customization';

interface CustomizationModalProps {
  product: Product;
  rooms: Room[];
  mountOptions: MountOption[];
  config: ProductConfiguration;
  setConfig: React.Dispatch<React.SetStateAction<ProductConfiguration>>;
  onClose: () => void;
}

const CustomizationModal = ({
  product,
  rooms,
  mountOptions,
  config,
  setConfig,
  onClose,
}: CustomizationModalProps) => {
  // Calculate additional cost based on selected options
  const additionalCost = useMemo(() => {
    let cost = 0;
    const { customization } = product;

    if (config.headrail && customization.headrailOptions) {
      const option = customization.headrailOptions.find((o) => o.id === config.headrail);
      cost += option?.price || 0;
    }
    if (config.openStyle && customization.openStyleOptions) {
      const option = customization.openStyleOptions.find((o) => o.id === config.openStyle);
      cost += option?.price || 0;
    }
    if (config.valance && customization.valanceOptions) {
      const option = customization.valanceOptions.find((o) => o.id === config.valance);
      cost += option?.price || 0;
    }
    if (config.control && customization.controlOptions) {
      const option = customization.controlOptions.find((o) => o.id === config.control);
      cost += option?.price || 0;
    }
    if (config.rollerStyle && customization.rollerStyleOptions) {
      const option = customization.rollerStyleOptions.find((o) => o.id === config.rollerStyle);
      cost += option?.price || 0;
    }
    if (config.fabricType && customization.fabricTypeOptions) {
      const option = customization.fabricTypeOptions.find((o) => o.id === config.fabricType);
      cost += option?.price || 0;
    }
    if (config.bottomBar && customization.bottomBarOptions) {
      const option = customization.bottomBarOptions.find((o) => o.id === config.bottomBar);
      cost += option?.price || 0;
    }
    if (config.lift && customization.liftOptions) {
      const option = customization.liftOptions.find((o) => o.id === config.lift);
      cost += option?.price || 0;
    }

    return cost;
  }, [config, product.customization]);

  const totalPrice = product.price + additionalCost;

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-[#00473c]' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const handleBuyNow = () => {
    console.log('Buy now with config:', config);
    // Handle purchase logic
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-20 py-4 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00473c]">{product.category}</Link>
            <span>›</span>
            <button onClick={onClose} className="hover:text-[#00473c]">{product.name}</button>
            <span>›</span>
            <span className="text-gray-900">Customize</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-20 py-8 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left - Gallery (Sticky on desktop) */}
            <div className="w-full lg:w-[45%] lg:sticky lg:top-4 lg:self-start">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right - Configuration */}
            <div className="w-full lg:w-[55%]">
              {/* Product Title */}
              <h1 className="text-2xl font-medium text-[#3a3a3a] mb-1">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-2">
                Estimated Shipping Date: <span className="text-[#00473c] font-medium">{product.estimatedDelivery}</span>
              </p>
              <div className="flex items-center gap-1 mb-6">
                {renderStars(product.rating)}
              </div>

              {/* Configuration Section */}
              <div className="bg-[#00473c] text-white px-4 py-3 rounded-t-lg">
                <h2 className="text-lg font-medium">Configure Your Window Treatment</h2>
              </div>

              <div className="border border-gray-200 border-t-0 rounded-b-lg p-6 space-y-8">
                {/* Size Selector */}
                {product.features.hasSize && (
                  <SizeSelector
                    width={config.width}
                    widthFraction={config.widthFraction}
                    height={config.height}
                    heightFraction={config.heightFraction}
                    onWidthChange={(value) => setConfig({ ...config, width: value })}
                    onWidthFractionChange={(value) => setConfig({ ...config, widthFraction: value })}
                    onHeightChange={(value) => setConfig({ ...config, height: value })}
                    onHeightFractionChange={(value) => setConfig({ ...config, heightFraction: value })}
                  />
                )}

                {/* Room Selector */}
                {product.features.hasRoom && (
                  <RoomSelector
                    rooms={rooms}
                    selectedRoom={config.room}
                    onRoomChange={(roomId) => setConfig({ ...config, room: roomId })}
                  />
                )}

                {/* Mount Selector */}
                {product.features.hasMount && (
                  <MountSelector
                    options={mountOptions}
                    selectedMount={config.mount}
                    onMountChange={(mountId) => setConfig({ ...config, mount: mountId })}
                  />
                )}

                {/* Fabric Type Selector */}
                {product.features.hasFabricType && product.customization.fabricTypeOptions && (
                  <FabricTypeSelector
                    options={product.customization.fabricTypeOptions}
                    selectedType={config.fabricType}
                    onTypeChange={(typeId) => setConfig({ ...config, fabricType: typeId })}
                  />
                )}

                {/* Colour Selector */}
                {product.features.hasColour && product.customization.colourOptions && (
                  <ColourSelector
                    options={product.customization.colourOptions}
                    selectedColour={config.colour}
                    onColourChange={(colourId) => setConfig({ ...config, colour: colourId })}
                  />
                )}

                {/* Headrail Selector */}
                {product.features.hasHeadrail && product.customization.headrailOptions && (
                  <HeadrailSelector
                    options={product.customization.headrailOptions}
                    selectedHeadrail={config.headrail}
                    onHeadrailChange={(headrailId) => setConfig({ ...config, headrail: headrailId })}
                  />
                )}

                {/* Open Style Selector */}
                {product.features.hasOpenStyle && product.customization.openStyleOptions && (
                  <>
                    <OpenStyleSelector
                      options={product.customization.openStyleOptions}
                      selectedStyle={config.openStyle}
                      onStyleChange={(styleId) => setConfig({ ...config, openStyle: styleId })}
                    />
                    {/* Wand Position */}
                    {product.features.hasWandPosition &&
                      product.customization.wandPositionOptions &&
                      config.openStyle === 'wand' && (
                        <WandPositionSelector
                          options={product.customization.wandPositionOptions}
                          selectedPosition={config.wandPosition}
                          onPositionChange={(positionId) =>
                            setConfig({ ...config, wandPosition: positionId })
                          }
                        />
                      )}
                  </>
                )}

                {/* Control Selector */}
                {product.features.hasControl && product.customization.controlOptions && (
                  <ControlSelector
                    options={product.customization.controlOptions}
                    selectedControl={config.control}
                    onControlChange={(controlId) => setConfig({ ...config, control: controlId })}
                    positionOptions={product.customization.controlPositionOptions}
                    selectedPosition={config.controlPosition}
                    onPositionChange={(positionId) =>
                      setConfig({ ...config, controlPosition: positionId })
                    }
                  />
                )}

                {/* Lift Selector */}
                {product.features.hasLift && product.customization.liftOptions && (
                  <LiftSelector
                    options={product.customization.liftOptions}
                    selectedLift={config.lift}
                    onLiftChange={(liftId) => setConfig({ ...config, lift: liftId })}
                    positionOptions={product.customization.liftPositionOptions}
                    selectedPosition={config.liftPosition}
                    onPositionChange={(positionId) =>
                      setConfig({ ...config, liftPosition: positionId })
                    }
                  />
                )}

                {/* Roller Style Selector */}
                {product.features.hasRollerStyle && product.customization.rollerStyleOptions && (
                  <RollerStyleSelector
                    options={product.customization.rollerStyleOptions}
                    selectedStyle={config.rollerStyle}
                    onStyleChange={(styleId) => setConfig({ ...config, rollerStyle: styleId })}
                  />
                )}

                {/* Valance Selector */}
                {product.features.hasValance && product.customization.valanceOptions && (
                  <ValanceSelector
                    options={product.customization.valanceOptions}
                    selectedValance={config.valance}
                    onValanceChange={(valanceId) => setConfig({ ...config, valance: valanceId })}
                  />
                )}

                {/* Bottom Bar Selector */}
                {product.features.hasBottomBar && product.customization.bottomBarOptions && (
                  <BottomBarSelector
                    options={product.customization.bottomBarOptions}
                    selectedBar={config.bottomBar}
                    onBarChange={(barId) => setConfig({ ...config, bottomBar: barId })}
                  />
                )}

                {/* Dropdown Selectors - Side by Side */}
                {(product.features.hasBottomChain || product.features.hasBracketType) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.hasBottomChain && product.customization.bottomChainOptions && (
                      <DropdownSelector
                        label="Select Bottom Weight Chain"
                        options={product.customization.bottomChainOptions}
                        selectedValue={config.bottomChain}
                        onValueChange={(value) => setConfig({ ...config, bottomChain: value })}
                        placeholder="Select Bottom Weight Chain"
                      />
                    )}

                    {product.features.hasBracketType && product.customization.bracketOptions && (
                      <DropdownSelector
                        label="Bracket Type"
                        options={product.customization.bracketOptions}
                        selectedValue={config.bracketType}
                        onValueChange={(value) => setConfig({ ...config, bracketType: value })}
                        placeholder="Select Bracket Type"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Price</span>
              <div className="text-2xl font-bold text-[#3a3a3a]">${totalPrice}</div>
            </div>
            <button
              onClick={handleBuyNow}
              className="bg-[#00473c] text-white py-3 px-8 rounded font-medium hover:bg-[#003830] transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
