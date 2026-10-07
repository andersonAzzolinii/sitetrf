# Merge and Divert Conveyors for Case Routing.

Routing modules that combine lines, send each case to its destination and remove nonconforming units.

Source: https://trfautomation.com/conveyor-systems/merge-divert-and-sorting/

Merge and divert conveyors are the routing part of a conveyor line: a merge combines cases from several lines onto one path, a divert sends a case to another lane, sorting directs each case to its destination and a reject station removes nonconforming units. TRF Industrial Automation engineers these modules inside TRFIntraflow, always as part of a complete line.

Routing is where a plant with several packaging lines gains flexibility or loses it. When each line has its own path to its own palletizer, any change in product mix or layout means moving people and pallets. When cases are merged, identified and routed by an engineered system, several lines can share equipment and every SKU still reaches the right place.

[Talk with our Sales Engineer](https://trfautomation.com/contact/)

## Key Facts About Merge, Divert and Sorting

| Item | Routing modules |
|---|---|
| What it is | The Routing module family of TRFIntraflow, engineered into a complete conveyor system |
| Standard modules | Merge, divert, sorting and reject station |
| Items handled | Cases, cartons, trays, totes and other packaged units |
| Where it runs | Between secondary packaging, case packing, palletizing and warehouse interfaces |
| Main job | Bring several lines together, send each case to the right destination and remove nonconforming units |
| Identification | Barcode and vision interfaces where the project requires them |
| Throughput | No catalog speed figure; routing rates are defined per project around your line rates |
| How it is supplied | Always inside an engineered system integrated into the line, never as loose components |

## What Is the Difference Between a Merge, a Divert and a Sorting Conveyor?

A merge combines cases from two or more conveyors onto one path, a divert moves a case from the main path to another lane, and a sorting conveyor sends each case to an assigned destination based on product data, usually read from a barcode or by vision. A reject station, the fourth routing module, takes out cases that fail a check.

In TRFIntraflow, these four functions form the Routing family of standard modules, and they are useful only when the other families support them: a merge needs spacing, a sort needs identification and a divert needs somewhere for the case to go.

A conveyor routing system therefore has two layers. The physical layer is the hardware that joins two streams, moves a case sideways or pulls it off the line. The information layer is the sensors, the PLC and the data that tell the hardware what to do with each case. TRF engineers both layers together, because a routing decision made without reliable information sends cases to the wrong place, and reliable information is of no use without hardware that acts on it at line rate.

## How Does a Conveyor Merge Combine Several Lines Into One?

A conveyor merge combines cases from two or more conveyors onto one path, so several packaging lines can share the equipment downstream, most often one palletizing area. It is the module that makes multi-line consolidation possible.

A good merge is not just a place where two conveyors meet. If cases from both lines arrive at the same moment, they collide or jam. If one line always wins priority, the other backs up and its case packer stops. The merge is engineered with the modules around it: [accumulation and flow control](https://trfautomation.com/conveyor-systems/accumulation-and-flow-control/) holds cases from each line, metering releases them at a controlled rate and gapping creates the space the merge needs. Control logic decides how the lines take turns, for example alternating, weighted toward the busier line or based on which palletizer position needs product.

Merging matters most when a plant wants to centralize palletizing. A [TRFSpeed high-speed palletizer](https://trfautomation.com/robotic-palletizing/high-speed-palletizer/) serving several lines needs one steady, well-spaced stream, and the merge, with its buffers and metering, is what produces it.

## When Does a Conveyor Line Need a Divert?

A conveyor line needs a divert wherever one stream must split into two or more. The reasons vary by plant and are defined with you during the application review:

- A second palletizing position, so a line keeps running when one palletizer or pallet position is busy.
- A manual station, for cases that need hand handling, sampling or repacking.
- A separate destination by SKU, customer or shipping route.
- A reject lane, where cases that fail a check leave the main flow.
- Balancing between two palletizers or two packing cells, so neither waits while the other is overloaded.

A divert has to act on a single case without catching the next one, which is why it depends on gapping and on sensors that confirm the case position. The mechanism is selected for the case size, weight and packaging and the rate of the line during engineering. A lane that is full must be known to the control system, so it can choose another path or slow the flow.

## How Does a Conveyor Sorting System Identify Each Case?

A conveyor sorting system identifies each case with a barcode reader or a vision interface and then directs it to its assigned destination. Where a divert follows a simple rule, sorting follows information carried by the case itself:

1. **Spacing.** Gapping separates the cases so each one can be read individually.
2. **Identification.** A barcode reader or vision interface reads the label or recognizes the case.
3. **Decision.** The PLC compares the data with the routing rules of the plant, which may come from a warehouse management system where the project requires it.
4. **Action.** Diverts send the case to its lane, and the count per lane is tracked.
5. **Exception.** A case that cannot be read or does not match any rule goes to the reject station instead of being guessed at.

Sorting helps keep SKUs from mixing on the pallet. When several lines feed a shared palletizer, each pallet must hold the correct product, and sorting is the step that sends the right case to the right pallet position.

## What Does a Reject Station Do on a Conveyor Line?

A reject station removes cases that fail a check before they reach the palletizer or the warehouse, such as a case with an unreadable or mismatched code, a case that does not meet the expected profile or a case flagged by an upstream inspection device. A nonconforming case on a pallet can force rework, so removing it before palletizing keeps the pallet clean.

The reject station is placed downstream of the reader or inspection device, with enough spacing to act on one case and a lane that leads to a location an operator can reach. It is connected to the control system, so the line can record rejected cases where the project requires it.

Merge, divert, sorting and reject modules belong to [TRFIntraflow](https://trfautomation.com/conveyor-systems/case-conveyor-intralogistics/). For exposed food or hygienic zones, see [TRFCleanflow](https://trfautomation.com/conveyor-systems/hygienic-food-conveyor/); both platforms are compared on the [conveyor systems page](https://trfautomation.com/conveyor-systems/). Extended to case packing and palletizing, the same approach becomes [end-of-line integration](https://trfautomation.com/conveyor-systems/end-of-line-integration/).

## Frequently Asked Questions

### Can Several Packaging Lines Share One Palletizer?

Yes. Merge modules bring the lines onto one path, with buffers and metering that give each line its turn, so a stop on one line does not have to stop the others, and sorting helps keep SKUs from mixing on the pallet. The sharing logic is engineered together with the palletizer interface: [TRFSpeed](https://trfautomation.com/robotic-palletizing/high-speed-palletizer/) is built to consolidate the flow of several lines, and a [custom palletizer](https://trfautomation.com/robotic-palletizing/custom-palletizer/) covers layouts beyond the standard platforms.

### Does Sorting Require a Warehouse Management System?

No. Sorting can run on the product data read from the case and on rules held in the conveyor PLC. Where the plant uses a warehouse management system, TRFIntraflow includes WMS and warehouse interfaces, so the routing rules can come from the plant's logistics system. That interface is defined during project engineering with the plant's IT team.

### Can a Conveyor System Integrate With My Palletizer and Case Packer?

Yes. Routing modules carry each case from the machine that packs it, such as [TRFRapidpack](https://trfautomation.com/case-packing/robotic-case-packer/), [TRFOnepack](https://trfautomation.com/case-packing/integrated-case-packer/) or [TRFDroppack](https://trfautomation.com/case-packing/drop-packer/), to the palletizer or position that receives it, through defined interfaces. Signals such as lane full, palletizer ready and case rejected are engineered once, in a single control concept.

### Which Industries Use Merge and Divert Conveyors?

Plants with several packaging lines or many SKUs use them the most, including [food processing](https://trfautomation.com/industries/food-processing/), [protein processing](https://trfautomation.com/industries/protein-processing/), [personal care](https://trfautomation.com/industries/personal-care-and-cosmetics/), [CPG](https://trfautomation.com/industries/consumer-packaged-goods/), [beverage](https://trfautomation.com/industries/beverage/) and [pet food](https://trfautomation.com/industries/pet-food/) manufacturers.

### What Information Is Needed to Design a Routing System?

Layout drawings, line rates, case dimensions and weights, the number of lines and destinations, the way cases are identified and the equipment the conveyors must connect to. A list of your SKUs and the routing rules you use today is often the most useful document to start with. The application review turns this into the module arrangement and the control logic.

## Talk With Our Sales Engineer About Merge and Divert Conveyors

If several lines must reach one palletizing area, if SKUs must be routed to different lanes, or if cases are still sorted by hand, the next step is a flow review. Share your layout, line rates, case data and the routing rules you use today, and a TRF Sales Engineer will outline the merge, divert, sorting and reject modules your line needs, engineered as part of a complete TRFIntraflow system. Start on the [contact page](https://trfautomation.com/contact/).

[Talk with our Sales Engineer](https://trfautomation.com/contact/)

---

TRF Industrial Automation | 14840 W 107th St, Lenexa, KS 66215, United States | (913) 242-8019 | Serving the United States
