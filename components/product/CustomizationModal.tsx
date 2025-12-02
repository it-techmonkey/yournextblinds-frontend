'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Product, ProductConfiguration } from '@/types/product';
import ProductGallery from './ProductGallery';
import StarRating from './StarRating';
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
import {
  ROOM_OPTIONS,
  MOUNT_OPTIONS,
  CONTROL_OPTIONS,
  CONTROL_POSITION_OPTIONS,
  LIFT_OPTIONS,
  LIFT_POSITION_OPTIONS,
  VALANCE_OPTIONS,
  HEADRAIL_OPTIONS,
  WAND_POSITION_OPTIONS,
  OPEN_STYLE_OPTIONS,
  ROLLER_STYLE_OPTIONS,
  BOTTOM_BAR_OPTIONS,
  COLOUR_OPTIONS,
  FABRIC_TYPE_OPTIONS,
  BOTTOM_CHAIN_OPTIONS,
  BRACKET_OPTIONS,
} from '@/data/customizations';

interface CustomizationModalProps {
  product: Product;
  config: ProductConfiguration;
  setConfig: React.Dispatch<React.SetStateAction<ProductConfiguration>>;
  onClose: () => void;
}

const CustomizationModal = ({
  product,
  config,
  setConfig,
  onClose,
}: CustomizationModalProps) => {
  // Calculate additional cost based on selected options
  const additionalCost = useMemo(() => {
    let cost = 0;

    if (config.headrail && product.features.hasHeadrail) {
      const option = HEADRAIL_OPTIONS.find((o) => o.id === config.headrail);
      cost += option?.price || 0;
    }
    if (config.openStyle && product.features.hasOpenStyle) {
      const option = OPEN_STYLE_OPTIONS.find((o) => o.id === config.openStyle);
      cost += option?.price || 0;
    }
    if (config.valance && product.features.hasValance) {
      const option = VALANCE_OPTIONS.find((o) => o.id === config.valance);
      cost += option?.price || 0;
    }
    if (config.control && product.features.hasControl) {
      const option = CONTROL_OPTIONS.find((o) => o.id === config.control);
      cost += option?.price || 0;
    }
    if (config.rollerStyle && product.features.hasRollerStyle) {
      const option = ROLLER_STYLE_OPTIONS.find((o) => o.id === config.rollerStyle);
      cost += option?.price || 0;
    }
    if (config.fabricType && product.features.hasFabricType) {
      const option = FABRIC_TYPE_OPTIONS.find((o) => o.id === config.fabricType);
      cost += option?.price || 0;
    }
    if (config.bottomBar && product.features.hasBottomBar) {
      const option = BOTTOM_BAR_OPTIONS.find((o) => o.id === config.bottomBar);
      cost += option?.price || 0;
    }
    if (config.lift && product.features.hasLift) {
      const option = LIFT_OPTIONS.find((o) => o.id === config.lift);
      cost += option?.price || 0;
    }

    return cost;
  }, [config, product.features]);

  const totalPrice = product.price + additionalCost;

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
            <span>&gt;</span>
            <button onClick={onClose} className="hover:text-[#00473c]">{product.name}</button>
            <span>&gt;</span>
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
              <h1 className="text-2xl lg:text-3xl font-medium text-[#3a3a3a] mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-2">
                Estimated Shipping Date: <span className="text-[#00473c] font-medium">{product.estimatedDelivery}</span>
              </p>
              <div className="flex items-center gap-1 mb-6">
                <StarRating rating={product.rating} />
              </div>

              {/* Configuration Title */}
              <h2 className="text-xl font-medium text-[#3a3a3a] mb-6 mt-8">Configure Your Window Treatment</h2>

              <div className="space-y-8 divide-y divide-gray-100">
                {/* Size Selector */}
                {product.features.hasSize && (
                  <div className="pt-6 first:pt-0">
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
                  </div>
                )}

                {/* Room Selector */}
                {product.features.hasRoom && (
                  <div className="pt-6">
                    <RoomSelector
                      rooms={ROOM_OPTIONS}
                      selectedRoom={config.room}
                      onRoomChange={(roomId) => setConfig({ ...config, room: roomId })}
                    />
                  </div>
                )}

                {/* Mount Selector */}
                {product.features.hasMount && (
                  <div className="pt-6">
                    <MountSelector
                      options={MOUNT_OPTIONS}
                      selectedMount={config.mount}
                      onMountChange={(mountId) => setConfig({ ...config, mount: mountId })}
                    />
                  </div>
                )}

                {/* Fabric Type Selector */}
                {product.features.hasFabricType && (
                  <div className="pt-6">
                    <FabricTypeSelector
                      options={FABRIC_TYPE_OPTIONS}
                      selectedType={config.fabricType}
                      onTypeChange={(typeId) => setConfig({ ...config, fabricType: typeId })}
                    />
                  </div>
                )}

                {/* Colour Selector */}
                {product.features.hasColour && (
                  <div className="pt-6">
                    <ColourSelector
                      options={COLOUR_OPTIONS}
                      selectedColour={config.colour}
                      onColourChange={(colourId) => setConfig({ ...config, colour: colourId })}
                    />
                  </div>
                )}

                {/* Headrail Selector */}
                {product.features.hasHeadrail && (
                  <div className="pt-6">
                    <HeadrailSelector
                      options={HEADRAIL_OPTIONS}
                      selectedHeadrail={config.headrail}
                      onHeadrailChange={(headrailId) => setConfig({ ...config, headrail: headrailId })}
                    />
                  </div>
                )}

                {/* Open Style Selector */}
                {product.features.hasOpenStyle && (
                  <>
                    <div className="pt-6">
                      <OpenStyleSelector
                        options={OPEN_STYLE_OPTIONS}
                        selectedStyle={config.openStyle}
                        onStyleChange={(styleId) => setConfig({ ...config, openStyle: styleId })}
                      />
                    </div>
                    {/* Wand Position */}
                    {product.features.hasWandPosition &&
                      config.openStyle === 'wand' && (
                        <div className="pt-6">
                          <WandPositionSelector
                            options={WAND_POSITION_OPTIONS}
                            selectedPosition={config.wandPosition}
                            onPositionChange={(positionId) =>
                              setConfig({ ...config, wandPosition: positionId })}
                          />
                        </div>
                      )}
                  </>
                )}

                {/* Control Selector */}
                {product.features.hasControl && (
                  <div className="pt-6">
                    <ControlSelector
                      options={CONTROL_OPTIONS}
                      selectedControl={config.control}
                      onControlChange={(controlId) => setConfig({ ...config, control: controlId })}
                      positionOptions={CONTROL_POSITION_OPTIONS}
                      selectedPosition={config.controlPosition}
                      onPositionChange={(positionId) =>
                        setConfig({ ...config, controlPosition: positionId })}
                    />
                  </div>
                )}

                {/* Lift Selector */}
                {product.features.hasLift && (
                  <div className="pt-6">
                    <LiftSelector
                      options={LIFT_OPTIONS}
                      selectedLift={config.lift}
                      onLiftChange={(liftId) => setConfig({ ...config, lift: liftId })}
                      positionOptions={LIFT_POSITION_OPTIONS}
                      selectedPosition={config.liftPosition}
                      onPositionChange={(positionId) =>
                        setConfig({ ...config, liftPosition: positionId })}
                    />
                  </div>
                )}

                {/* Roller Style Selector */}
                {product.features.hasRollerStyle && (
                  <div className="pt-6">
                    <RollerStyleSelector
                      options={ROLLER_STYLE_OPTIONS}
                      selectedStyle={config.rollerStyle}
                      onStyleChange={(styleId) => setConfig({ ...config, rollerStyle: styleId })}
                    />
                  </div>
                )}
                {/* Valance Selector */}
                {product.features.hasValance && (
                  <div className="pt-6">
                    <ValanceSelector
                      options={VALANCE_OPTIONS}
                      selectedValance={config.valance}
                      onValanceChange={(valanceId) => setConfig({ ...config, valance: valanceId })}
                    />
                  </div>
                )}

                {/* Bottom Bar Selector */}
                {product.features.hasBottomBar && (
                  <div className="pt-6">
                    <BottomBarSelector
                      options={BOTTOM_BAR_OPTIONS}
                      selectedBar={config.bottomBar}
                      onBarChange={(barId) => setConfig({ ...config, bottomBar: barId })}
                    />
                  </div>
                )}

                {/* Dropdown Selectors - Side by Side */}
                {(product.features.hasBottomChain || product.features.hasBracketType) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                    {product.features.hasBottomChain && (
                      <DropdownSelector
                        label="Select Bottom Weight Chain"
                        options={BOTTOM_CHAIN_OPTIONS}
                        selectedValue={config.bottomChain}
                        onValueChange={(value) => setConfig({ ...config, bottomChain: value })}
                        placeholder="Select Bottom Weight Chain"
                      />
                    )}

                    {product.features.hasBracketType && (
                      <DropdownSelector
                        label="Bracket Type"
                        options={BRACKET_OPTIONS}
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
